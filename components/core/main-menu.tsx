import React, { FC, RefObject, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  GestureResponderEvent,
  Text,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Href, useRouter, usePathname } from "expo-router";
import { SvgProps } from "react-native-svg";
import * as Haptics from "expo-haptics";

import { Colors } from "@/constants/theme";

import { TransactionKind } from "@/model/transaction";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

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

interface FloatButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}
function FloatButton({ onPress }: FloatButtonProps) {
  const colorScheme = useThemeColor();
  const { ActionIcon } = useIcon();
  const {
    floatButtonContainer,
    floatButtonWrapper,
    floatButtonWrapperBorder,
    floatButton,
    floatButtonIcon,
  } = styles(colorScheme);

  const onPressHandler = (event: GestureResponderEvent) => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      onPress?.(event);
    }
  };

  return (
    <View style={floatButtonContainer}>
      <View style={floatButtonWrapperBorder}>
        <View style={floatButtonWrapper}>
          <TouchableOpacity
            style={floatButton}
            activeOpacity={0.8}
            onPressIn={onPressHandler}
          >
            <ActionIcon width={32} height={32} fill={floatButtonIcon.color} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

interface ActionsMenuProps {
  transactionModalRef: RefObject<BottomSheetModal>;
  addTransaction: (kind: TransactionKind) => void;
}
function ActionsMenu({
  transactionModalRef,
  addTransaction,
}: ActionsMenuProps) {
  const colorScheme = useThemeColor();
  const { ExpenseIcon, IncomeIcon, TransactionsIcon } = useIcon();
  const {
    modalSheetView,
    modalSheetViewContainer,
    modalSheetAction,
    modalSheetActionIcon,
    modalSheetActionText,
    modalSheetActionIncome,
    modalSheetActionExpense,
    modalSheetActionTransfer,
  } = styles(colorScheme);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        key="transaction"
        ref={transactionModalRef}
        style={modalSheetView}
        enablePanDownToClose
      >
        <BottomSheetView>
          <SafeAreaView>
            <View style={modalSheetViewContainer}>
              <TouchableOpacity
                style={[modalSheetAction, modalSheetActionIncome]}
                activeOpacity={0.8}
                onPress={() => addTransaction("income")}
              >
                <IncomeIcon
                  width={24}
                  height={24}
                  fill={modalSheetActionIcon.color}
                />
                <Text style={modalSheetActionText}>Adicionar receita</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalSheetAction, modalSheetActionExpense]}
                activeOpacity={0.8}
                onPress={() => addTransaction("expense")}
              >
                <ExpenseIcon
                  width={24}
                  height={24}
                  fill={modalSheetActionIcon.color}
                />
                <Text style={modalSheetActionText}>Adicionar despesa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalSheetAction, modalSheetActionTransfer]}
                activeOpacity={0.8}
                onPress={() => addTransaction("transfer")}
              >
                <TransactionsIcon
                  width={24}
                  height={24}
                  fill={modalSheetActionIcon.color}
                />
                <Text style={modalSheetActionText}>
                  Adicionar trnasferencia
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

interface MainMenuProps {}
export default function MainMenu({}: MainMenuProps) {
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
    floatButtonContainer: {
      width: 80,
      position: "relative",
      backgroundColor: colorScheme.background.primary,
    },
    floatButtonWrapper: {
      width: 80,
      height: 60,
      marginTop: 20,
      backgroundColor: colorScheme.background.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    floatButtonWrapperBorder: {
      position: "absolute",
      top: -32,
      width: 80,
      height: 80,
      borderRadius: 70,
      backgroundColor: colorScheme.background.primary,
      borderColor: colorScheme.border.primary,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    floatButton: {
      position: "absolute",
      top: -8,
      width: 54,
      height: 54,
      borderRadius: 50,
      backgroundColor: colorScheme.brand.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    floatButtonIcon: {
      color: "white",
    },
    modalSheetView: {
      borderTopStartRadius: 6,
      borderTopEndRadius: 6,
      elevation: 3,
      shadowColor: "#333333",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      backgroundColor: colorScheme.background.secondary,
    },
    modalSheetViewContainer: {
      padding: 12,
      marginBottom: 20,
    },
    modalSheetAction: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      marginBottom: 14,
      borderRadius: 6,
      padding: 12,
    },
    modalSheetActionText: {
      fontSize: 18,
      fontFamily: "Nunito-Bold",
      marginLeft: 6,
      color: colorScheme.button.primary.foreground,
    },
    modalSheetActionIcon: {
      color: colorScheme.button.primary.foreground,
    },
    modalSheetActionIncome: {
      backgroundColor: colorScheme.green.primary,
    },
    modalSheetActionExpense: {
      backgroundColor: colorScheme.red.primary,
    },
    modalSheetActionTransfer: {
      backgroundColor: colorScheme.button.primary.background,
    },
  });
