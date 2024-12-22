import React, { FC, RefObject, useRef } from "react";
import {
  StyleSheet,
  View,
  ColorSchemeName,
  SafeAreaView,
  TouchableOpacity,
  GestureResponderEvent,
  Text,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Href, useRouter, usePathname } from "expo-router";
import { SvgProps } from "react-native-svg";
import * as Haptics from "expo-haptics";

import { COLORS, ICONS } from "@/constants/theme";

import { TransactionKind } from "@/model/transaction";
import { ScrollView } from "react-native-gesture-handler";
interface TransactionDetailsProps {
  id: string;
}
export default function TransactionDetails({ id }: TransactionDetailsProps) {
  const { replace, back } = useRouter();
  const colorScheme = useColorScheme();
  const {
    container,
    header,
    headerDefault,
    headerExpense,
    headerIncome,
    footer,
    action,
    actionPrimary,
    actionSecondary,
    actionPrimaryText,
    actionSecondaryText,
  } = styles(colorScheme);

  const getHeaderColor = (kind: TransactionKind): StyleProp<ViewStyle> => {
    switch (kind) {
      case "expense":
        return headerExpense;
      case "income":
        return headerIncome;
      case "transfer":
        return headerDefault;
      default:
        return headerDefault;
    }
  };

  const editHandler = () => replace(`/transactions/edit/${id}`)

  const cancelHandler = () => back();

  return (
    <View style={container}>
      <View style={[header, getHeaderColor("expense")]}>
        <SafeAreaView>
          <Text>{id}</Text>
        </SafeAreaView>
      </View>
      <ScrollView contentContainerStyle={{ flex: 1 }}></ScrollView>
      <View style={footer}>
        <TouchableOpacity
          style={[action, actionSecondary]}
          activeOpacity={0.8}
          onPressIn={cancelHandler}
        >
          <Text style={actionSecondaryText}>Fechar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[action, actionPrimary]}
          activeOpacity={0.8}
          onPressIn={editHandler}
        >
          <Text style={actionPrimaryText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[colorScheme ?? "light"].background.primary,
    },
    header: {
      padding: 12,
    },
    headerIncome: {
      backgroundColor: COLORS[colorScheme ?? "light"].green.primary,
    },
    headerExpense: {
      backgroundColor: COLORS[colorScheme ?? "light"].red.primary,
    },
    headerDefault: {
      backgroundColor: COLORS[colorScheme ?? "light"].brand.primary,
    },
    footer: {
      padding: 12,
      flexDirection: "row",
    },
    action: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
      borderRadius: 6,
      padding: 12,
    },

    actionPrimary: {
      backgroundColor: COLORS[colorScheme ?? "light"].button.primary.background,
      marginLeft: 6,
    },
    actionSecondary: {
      backgroundColor:
        COLORS[colorScheme ?? "light"].button.tertiary.background,
      marginRight: 6,
    },
    actionPrimaryText: {
      fontSize: 18,
      fontFamily: "Nunito-Bold",
      marginLeft: 6,
      color: COLORS[colorScheme ?? "light"].button.primary.foreground,
    },
    actionSecondaryText: {
      fontSize: 18,
      fontFamily: "Nunito-Bold",
      marginLeft: 6,
      color: COLORS[colorScheme ?? "light"].button.tertiary.foreground,
    },
  });
