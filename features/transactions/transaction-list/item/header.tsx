import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

import { moneyParser } from "@/utils/money-parser";

interface HeaderProps {
  ballance: number;
  futureBallance: number;
}
export function Header({ ballance, futureBallance }: HeaderProps) {
  const { t } = useTranslation();
  const colorScheme = useThemeColor();
  const isPositive: boolean = ballance < 0 ? false : true;

  const {
    container,
    wrapper,
    ballanceContainer,
    ballanceAmount,
    ballanceTitle,
    futureTitle,
    futureBallanceAmount,
    ballanceWrapper,
  } = styles(colorScheme, isPositive);

  return (
    <View style={container}>
      <View style={wrapper}>
        <View style={ballanceContainer}>
          <View>
            <Text style={ballanceTitle}>{t("currentBallance")}</Text>
            <Text style={futureTitle}>{t("futureBallance")}</Text>
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

const styles = (colorScheme: Colors, isPositive: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginBottom: 20,
      marginTop: 10,
    },
    wrapper: {
      borderRadius: 6,
      padding: 12,
      backgroundColor: colorScheme.background.secondary,
      overflow: "hidden",
    },
    ballanceContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ballanceWrapper: {
      flex: 1,
    },
    ballanceTitle: {
      fontFamily: "PoppinsSemiBold",
      color: colorScheme.text.primary,
      fontSize: 18,
    },
    ballanceAmount: {
      fontFamily: "NunitoExtraBold",
      color: isPositive ? colorScheme.green.primary : colorScheme.red.primary,
      textAlign: "right",
      fontSize: 24,
    },
    futureTitle: {
      fontFamily: "LatoRegular",
      color: colorScheme.text.secondary,
      fontSize: 14,
    },
    futureBallanceAmount: {
      fontFamily: "NunitoExtraBold",
      color: colorScheme.text.secondary,
      textAlign: "right",
    },
  });
