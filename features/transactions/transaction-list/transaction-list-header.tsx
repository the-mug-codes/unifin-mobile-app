import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
} from "react-native";

import { moneyParser } from "@/utils/money-parser";

import { COLORS } from "@/constants/theme";

interface TransactionListHeaderProps {
  ballance: number;
  futureBallance: number;
}
export function TransactionListHeader({
  ballance,
  futureBallance,
}: TransactionListHeaderProps) {
  const colorScheme = useColorScheme();
  const ballancePositive: boolean = ballance < 0 ? false : true;
  const futureBallancePositive: boolean = ballance < 0 ? false : true;

  const {
    container,
    wrapper,
    ballanceContainer,
    ballanceAmount,
    ballanceTitle,
    futureTitle,
    futureBallanceAmount,
    ballanceWrapper
  } = styles(colorScheme, ballancePositive, futureBallancePositive);

  return (
    <View style={container}>
      <View style={wrapper}>
        <View style={ballanceContainer}>
          <View>
            <Text style={ballanceTitle}>Saldo atual</Text>
            <Text style={futureTitle}>Saldo previsto</Text>
          </View>
          <View style={ballanceWrapper}>
            <Text style={ballanceAmount}>{moneyParser(ballance)}</Text>
            <Text style={futureBallanceAmount}>
              {moneyParser(futureBallance)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = (
  colorScheme: ColorSchemeName,
  balancePositive: boolean,
  futureBalancePositive: boolean
) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginBottom: 20,
      marginTop: 10,
    },
    wrapper: {
      borderRadius: 6,
      padding: 12,
      backgroundColor: COLORS[colorScheme ?? "light"].background.secondary,
      overflow: "hidden",
    },
    ballanceContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ballanceWrapper :{
      flex: 1,
    },
    ballanceTitle: {
      fontFamily: "Poppins-SemiBold",
      color: COLORS[colorScheme ?? "light"].text.primary,
      fontSize: 18,
    },
    ballanceAmount: {
      fontFamily: "Nunito-ExtraBold",
      color: balancePositive ? COLORS[colorScheme ?? "light"].green.primary : COLORS[colorScheme ?? "light"].red.primary,
      textAlign: "right",
      fontSize: 24,
    },
    futureTitle: {
      fontFamily: "Lato-Regular",
      color: COLORS[colorScheme ?? "light"].text.secondary,
      fontSize: 14,
    },
    futureBallanceAmount: {
      fontFamily: "Nunito-ExtraBold",
      color: COLORS[colorScheme ?? "light"].text.secondary,
      textAlign: "right",
    },
  });
