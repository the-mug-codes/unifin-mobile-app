import React, { Children, ReactNode, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useButtonFeedback } from "@/hooks/use-button-feedback";
import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

import { TransactionKind } from "@/model/transaction";

interface HeaderProps {
  kind: TransactionKind;
  children: ReactNode;
}
export default function Header({ kind, children }: HeaderProps) {
  const [kindSelected, setKindSelected] = useState<TransactionKind>(kind);
  const colorScheme = useThemeColor();
  const {
    header,
    headerDefault,
    headerExpense,
    headerIncome,
    headerWrapper,
    kindSelector,
    kindSelectorOption,
    kindSelectorText,
    kindSelectorIndicator,
    kindSelectorIndicatorActive,
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

  const setKindHandler = (kind: TransactionKind) => {
    useButtonFeedback("medium");
    setKindSelected(kind);
  };

  return (
    <View style={[header, getHeaderColor(kindSelected)]}>
      <SafeAreaView style={headerWrapper}>
        <View style={kindSelector}>
          <TouchableOpacity
            style={kindSelectorOption}
            activeOpacity={0.8}
            onPressIn={() => setKindHandler("income")}
            disabled={kindSelected == "income"}
          >
            <Text style={kindSelectorText}>Receita</Text>
            <View
              style={[
                kindSelectorIndicator,
                kindSelected == "income" && kindSelectorIndicatorActive,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={kindSelectorOption}
            activeOpacity={0.8}
            onPressIn={() => setKindHandler("expense")}
            disabled={kindSelected == "expense"}
          >
            <Text style={kindSelectorText}>Despesa</Text>
            <View
              style={[
                kindSelectorIndicator,
                kindSelected == "expense" && kindSelectorIndicatorActive,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={kindSelectorOption}
            activeOpacity={0.8}
            onPressIn={() => setKindHandler("transfer")}
            disabled={kindSelected == "transfer"}
          >
            <Text style={kindSelectorText}>Tranferência</Text>
            <View
              style={[
                kindSelectorIndicator,
                kindSelected == "transfer" && kindSelectorIndicatorActive,
              ]}
            />
          </TouchableOpacity>
        </View>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    header: {
      padding: 12,
    },
    headerIncome: {
      backgroundColor: colorScheme.green.primary,
    },
    headerExpense: {
      backgroundColor: colorScheme.red.primary,
    },
    headerDefault: {
      backgroundColor: colorScheme.brand.primary,
    },
    headerWrapper: {
      flexDirection: "column",
    },
    kindSelector: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    kindSelectorOption: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 6,
      marginBottom: 14,
    },
    kindSelectorText: {
      fontFamily: "PoppinsSemiBold",
      color: colorScheme.text.invert,
      textAlign: "center",
      fontSize: 14,
    },
    kindSelectorIndicator: {
      height: 3,
      width: 12,
      borderRadius: 12,
      marginTop: 6,
      backgroundColor: "none",
    },
    kindSelectorIndicatorActive: {
      backgroundColor: colorScheme.text.invert,
    },
  });
