import React, { ReactNode, useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ColorSchemeName,
  SafeAreaView,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { COLORS, PRIMARY } from "@/constants/colors";
import { TransactionKind } from "@/model/transaction";

import { useColorScheme } from "@/hooks/useColorScheme";

interface ActionButtonProps {
  variant: TransactionKind;
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  icon: typeof Feather.defaultProps;
}
function ActionButton({ variant, title, icon, onPress }: ActionButtonProps) {
  const colorScheme = useColorScheme();
  const style = actionButtonStyles(colorScheme, variant);
  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={0.4}
      onPressIn={(event: GestureResponderEvent) => {
        if (process.env.EXPO_OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress?.(event);
        }
      }}
    >
      <>
        <Feather name={icon} size={20} style={style.icon} />
        <Text style={style.text}>{title}</Text>
      </>
    </TouchableOpacity>
  );
}

interface MenuButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  icon: typeof Feather.defaultProps;
}
function MenuButton({ icon, onPress }: MenuButtonProps) {
  const colorScheme = useColorScheme();
  const style = menuButtonStyle(colorScheme);
  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={0.4}
      onPressIn={(event: GestureResponderEvent) => {
        if (process.env.EXPO_OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress?.(event);
        }
      }}
    >
      <Feather name={icon} size={20} style={style.icon} />
    </TouchableOpacity>
  );
}

interface MainLayoutProps {
  transactionForm?: ReactNode;
}
export default function MainMenu({ transactionForm }: MainLayoutProps) {
  const colorScheme = useColorScheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const transactionModalRef = useRef<BottomSheetModal>(null);
  const menuModalRef = useRef<BottomSheet>(null);

  const style = styles(colorScheme);

  const handlePresentTransactionPress = useCallback(() => {
    transactionModalRef.current?.present();
    menuModalRef.current?.collapse();
  }, []);

  const handlePresentMenuPress = useCallback(() => {
    if (menuOpen) {
      menuModalRef.current?.collapse();
      setMenuOpen(false);
      return;
    }
    menuModalRef.current?.expand();
    setMenuOpen(true);
  }, [menuOpen]);

  const handlePresentMenuChanges = useCallback(
    (index: number) => {
      if (index) {
        setMenuOpen(true);
        return;
      }
      setMenuOpen(false);
    },
    [menuOpen]
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        key="transaction"
        ref={transactionModalRef}
        style={style.modalSheetView}
        snapPoints={["100%"]}
        enableDynamicSizing={false}
        handleComponent={null}
        enablePanDownToClose
      >
        <BottomSheetView children={transactionForm} />
      </BottomSheetModal>
      <BottomSheet
        key="menu"
        ref={menuModalRef}
        style={style.bottomSheetView}
        snapPoints={[190, 250]}
        enableDynamicSizing={false}
        enablePanDownToClose={false}
        onChange={handlePresentMenuChanges}
      >
        <BottomSheetView>
          <SafeAreaView style={style.mainMenu}>
            <View style={style.container}>
              <View style={style.actionButtonsContainer}>
                <ActionButton
                  variant="income"
                  icon="arrow-down-circle"
                  title="Receita"
                  onPress={handlePresentTransactionPress}
                />
                <ActionButton
                  variant="expense"
                  icon="arrow-up-circle"
                  title="Despesa"
                  onPress={handlePresentTransactionPress}
                />
                <ActionButton
                  variant="transfer"
                  icon="repeat"
                  title="Transferir"
                  onPress={handlePresentTransactionPress}
                />
              </View>
              <View style={style.menuButtonsContainer}>
                <MenuButton icon="home" />
                <MenuButton icon="calendar" />
                <MenuButton icon="repeat" />
                <MenuButton icon="target" />
                <MenuButton icon="grid" onPress={handlePresentMenuPress} />
              </View>
              <View style={style.menuMoreButtonsContainer}>
                <MenuButton icon="calendar" />
                <MenuButton icon="calendar" />
                <MenuButton icon="calendar" />
                <MenuButton icon="calendar" />
                <MenuButton icon="calendar" />
                <MenuButton icon="calendar" />
              </View>
            </View>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheet>
      <View style={style.safeArea} />
    </BottomSheetModalProvider>
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    safeArea: {
      position: "fixed",
      height: 20,
      backgroundColor: "white",
    },
    mainMenu: {
      paddingTop: 20,
      backgroundColor: "white",
    },
    container: {
      padding: 10,
      paddingTop: 0,
      paddingBottom: 0,
    },
    actionButtonsContainer: {
      flexDirection: "row",
    },
    menuButtonsContainer: {
      marginTop: 20,
      flexDirection: "row",
    },
    menuMoreButtonsContainer: {
      marginTop: 20,
      flexDirection: "row",
    },
    modalSheetView: {
      borderTopStartRadius: 18,
      borderTopEndRadius: 18,
      overflow: "hidden",
    },
    bottomSheetView: {
      borderTopStartRadius: 18,
      borderTopEndRadius: 18,
      elevation: 3,
      shadowColor: "#333333",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
    },
  });

const actionButtonStyles = (
  colorScheme: ColorSchemeName,
  type: TransactionKind
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 6,
      flexDirection: "column",
      backgroundColor: PRIMARY.tealBlue,
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      marginBottom: 2,
      color: "white",
    },
    text: {
      color: "white",
      fontWeight: "semibold",
      fontSize: 18,
    },
  });

const menuButtonStyle = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 6,
      flexDirection: "column",
      backgroundColor: PRIMARY.tealBlue,
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      marginBottom: 2,
      color: PRIMARY.tealBlue,
    },
    text: {
      color:PRIMARY.tealBlue,
      fontWeight: "semibold",
      fontSize: 12,
    },
  });
