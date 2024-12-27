import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { useTranslation } from "react-i18next";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

import { moneyParser } from "@/utils/money-parser";

interface FooterProps {
  finalBallance: number;
  income: number;
  outcome: number;
}
export function Footer({
  finalBallance,
  income,
  outcome,
}: FooterProps) {
  const ballancePositive: boolean = finalBallance < 0 ? false : true;
  const { t } = useTranslation();
  const colorScheme = useThemeColor();
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
            <Text style={transactionsTitle}>{t("income")}</Text>
            <Text style={[transactionsAmount, transactionsAmountIncome]}>
              {moneyParser(income)}
            </Text>
          </View>
          <View>
            <Text style={transactionsTitle}>{t("expense")}</Text>
            <Text style={[transactionsAmount, transactionsAmountOutcome]}>
              {moneyParser(outcome)}
            </Text>
          </View>
        </View>
        <View style={ballanceContainer}>
          <Text style={ballanceTitle}>{t("finalBalance")}</Text>
          <Text style={ballanceAmount}> {moneyParser(finalBallance)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = (colorScheme: Colors, balancePositive: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginVertical: 32,
    },
    wrapper: {
      borderRadius: 6,
      padding: 12,
      backgroundColor: colorScheme.background.secondary,
      overflow: "hidden",
      flexDirection: "row",
    },
    ballanceContainer: {
      flex: 1,
      justifyContent: "center",
    },
    ballanceTitle: {
      fontFamily: "PoppinsSemiBold",
      color: colorScheme.text.primary,
      textAlign: "right",
      fontSize: 18,
    },
    ballanceAmount: {
      fontFamily: "NunitoExtraBold",
      color: balancePositive
        ? colorScheme.green.primary
        : colorScheme.red.primary,
      textAlign: "right",
      fontSize: 24,
    },
    transactionsTitle: {
      fontFamily: "LatoRegular",
      color: colorScheme.text.secondary,
      fontSize: 14,
    },
    transactionsAmount: {
      fontFamily: "NunitoExtraBold",
      fontSize: 12,
    },
    transactionsAmountIncome: {
      color: colorScheme.green.primary,
    },
    transactionsAmountOutcome: {
      color: colorScheme.red.primary,
    },
  });
