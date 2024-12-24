import React, { FC, useRef } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Href, useRouter, usePathname } from "expo-router";
import { SvgProps } from "react-native-svg";
import * as Haptics from "expo-haptics";

import { Colors } from "@/constants/theme";

import { TransactionKind } from "@/model/transaction";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

import { FloatButton } from "@/components/core//float-button";
import { ActionsMenu } from "@/components/core/actions-menu";

interface MenuButtonProps {
  id?: Href;
  icon: FC<SvgProps>;
  onPress: (href: Href) => void;
}
function MenuButton({ id, icon: MenuIcon, onPress }: MenuButtonProps) {
  const colorScheme = useThemeColor();
  const { item, itemIcon, itemIconActive } = styles(colorScheme);
  const pathName = usePathname();

  const isActive = (): boolean => {
    if (pathName == id) return true;
    return false;
  };

  const pressHandler = () => {
    onPress(id as Href);
  };

  return (
    <TouchableOpacity
      style={item}
      activeOpacity={0.4}
      onPressIn={pressHandler}
      disabled={isActive()}
    >
      <MenuIcon
        width={24}
        height={24}
        fill={isActive() ? itemIconActive.color : itemIcon.color}
      />
    </TouchableOpacity>
  );
}

interface MainMenuProps {}
export function MainMenu({}: MainMenuProps) {
  const colorScheme = useThemeColor();
  const transactionModalRef = useRef<BottomSheetModal>(null);
  const { HomeIcon, CalendarIcon, TransactionsIcon, SavingsIcon } = useIcon();
  const { container, wrapper } = styles(colorScheme);
  const { push } = useRouter();

  const showHideActionsHandler = () => {
    transactionModalRef.current?.present();
  };

  const transactionHandler = (kind: TransactionKind) => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      push(`/transactions/new/${kind}`);
      transactionModalRef.current?.close();
    }
  };

  const navigationHandler = (href: Href) => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      push(href);
    }
  };

  return (
    <>
      <View style={container}>
        <SafeAreaView style={wrapper}>
          <MenuButton id="/" icon={HomeIcon} onPress={navigationHandler} />
          <MenuButton
            id="/transactions"
            icon={TransactionsIcon}
            onPress={navigationHandler}
          />
          <FloatButton onPress={showHideActionsHandler} />
          <MenuButton
            id="/calendar"
            icon={CalendarIcon}
            onPress={navigationHandler}
          />
          <MenuButton
            id="/savings"
            icon={SavingsIcon}
            onPress={navigationHandler}
          />
        </SafeAreaView>
      </View>
      <ActionsMenu
        transactionModalRef={transactionModalRef}
        addTransaction={transactionHandler}
      />
    </>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    container: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderTopColor: colorScheme.border.primary,
      borderTopWidth: 1,
      backgroundColor: colorScheme.background.primary,
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    item: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    itemIcon: {
      color: colorScheme.text.secondary,
    },
    itemIconActive: {
      color: colorScheme.brand.primary,
    },
  });
