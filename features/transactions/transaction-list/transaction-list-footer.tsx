import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
} from "react-native";

import { COLORS } from "@/constants/theme";
import { moneyParser } from "@/utils/money-parser";

interface TransactionListFooterProps {
  finalBallance: number;
  income: number;
  outcome: number;
}
export function TransactionListFooter({
  finalBallance,
  income,
  outcome,
}: TransactionListFooterProps) {
  const ballancePositive: boolean = finalBallance < 0 ? false : true;

  const colorScheme = useColorScheme();
  const {
    container,
    wrapper,
    ballanceContainer,
    ballanceAmount,
    ballanceTitle,
    transactionsTitle,
    transactionsAmount,
    transactionsAmountIncome,
    transactionsAmountOutcome,
  } = styles(colorScheme, ballancePositive);

  return (
    <View style={container}>
      <View style={wrapper}>
        <View>
          <View>
            <Text style={transactionsTitle}>Receitas</Text>
            <Text style={[transactionsAmount, transactionsAmountIncome]}>
              {moneyParser(income)}
            </Text>
          </View>
          <View>
            <Text style={transactionsTitle}>Despesas</Text>
            <Text style={[transactionsAmount, transactionsAmountOutcome]}>
              {moneyParser(outcome)}
            </Text>
          </View>
        </View>
        <View style={ballanceContainer}>
          <Text style={ballanceTitle}>Saldo Final</Text>
          <Text style={ballanceAmount}> {moneyParser(finalBallance)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName, balancePositive: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginVertical: 32,
    },
    wrapper: {
      borderRadius: 6,
      padding: 12,
      backgroundColor: COLORS[colorScheme ?? "light"].background.secondary,
      overflow: "hidden",
      flexDirection: "row",
    },
    ballanceContainer: {
      flex: 1,
      justifyContent: "center",
    },
    ballanceTitle: {
      fontFamily: "Poppins-SemiBold",
      color: COLORS[colorScheme ?? "light"].text.primary,
      textAlign: "right",
      fontSize: 18,
    },
    ballanceAmount: {
      fontFamily: "Nunito-ExtraBold",
      color: balancePositive
        ? COLORS[colorScheme ?? "light"].green.primary
        : COLORS[colorScheme ?? "light"].red.primary,
      textAlign: "right",
      fontSize: 24,
    },
    transactionsTitle: {
      fontFamily: "Lato-Regular",
      color: COLORS[colorScheme ?? "light"].text.secondary,
      fontSize: 14,
    },
    transactionsAmount: {
      fontFamily: "Nunito-ExtraBold",
      fontSize: 12,
    },
    transactionsAmountIncome: {
      color: COLORS[colorScheme ?? "light"].green.primary,
    },
    transactionsAmountOutcome: {
      color: COLORS[colorScheme ?? "light"].red.primary,
    },
  });
