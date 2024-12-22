import React from "react";
import { StyleSheet, View, ColorSchemeName, Text } from "react-native";
import { CartesianChart, Bar } from "victory-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

import { COLORS } from "@/constants/theme";

import { useColorScheme } from "@/hooks/useColorScheme";
import { moneyParser } from "@/utils/money-parser";
import { center } from "@shopify/react-native-skia";

interface CashFlowWidgetProps {
  incomeBallance: number;
  outcomeBallance: number;
  incomeFuture: number;
  outcomeFuture: number;
}
export function CashFlowWidget({
  incomeBallance,
  incomeFuture,
  outcomeBallance,
  outcomeFuture,
}: CashFlowWidgetProps) {
  const colorScheme = useColorScheme();
  const {
    container,
    wrapper,
    sectionTitle,
    flow,
    flowItem,
    chartItem,
    flowItemTitle,
    flowItemTitleFuture,
    flowAmount,
    flowAmountFuture,
    flowAmountIncome,
    flowAmountOutcome,
  } = styles(colorScheme);

  const income = [
    { flow: "Entradas", value: incomeBallance },
    { flow: "Entrada Futura", value: incomeFuture },
  ];

  const outcome = [
    { flow: "Saídas", value: outcomeBallance },
    { flow: "Saída Futura", value: outcomeFuture },
  ];

  return (
    <View style={container}>
      <Text style={sectionTitle}>Meu fluxo de caixa</Text>
      <View style={wrapper}>
        <View style={flow}>
          <View style={flowItem}>
            <View style={chartItem}>
              <View style={{ width: "100%", height: "100%" }}>
                <CartesianChart
                  domainPadding={{ right: 72, left: 72, top: 12, bottom: 12 }}
                  data={income}
                  xKey="flow"
                  yKeys={["value"]}
                >
                  {({ points, chartBounds }) => (
                    <Bar
                      points={points.value}
                      chartBounds={chartBounds}
                      barWidth={62}
                      color={COLORS[colorScheme ?? "light"].green.primary}
                      roundedCorners={{ topLeft: 6, topRight: 6 }}
                    />
                  )}
                </CartesianChart>
              </View>
            </View>
            <Text style={flowItemTitle}>Entrada</Text>
            <Text style={[flowAmount, flowAmountIncome]}>
              {moneyParser(incomeBallance)}
            </Text>
            <Text style={flowItemTitleFuture}>Previsto</Text>
            <Text style={[flowAmountFuture, flowAmountIncome]}>
              {moneyParser(incomeFuture)}
            </Text>
          </View>
          <View style={flowItem}>
            <View style={chartItem}>
              <View style={{ width: "100%", height: "100%" }}>
                <CartesianChart
                  domain={{ x: [0,0], y: [0, 0] }}
                  data={outcome}
                  xKey="flow"
                  yKeys={["value"]}
                >
                  {({ points, chartBounds }) => (
                    <Bar
                      points={points.value}
                      chartBounds={chartBounds}
                      barWidth={62}
                      color={COLORS[colorScheme ?? "light"].green.primary}
                      roundedCorners={{ topLeft: 6, topRight: 6 }}
                    />
                  )}
                </CartesianChart>
              </View>
            </View>
            <Text style={flowItemTitle}>Saída</Text>
            <Text style={[flowAmount, flowAmountOutcome]}>
              {moneyParser(outcomeBallance)}
            </Text>
            <Text style={flowItemTitleFuture}>Previsto</Text>
            <Text style={[flowAmountFuture, flowAmountOutcome]}>
              {moneyParser(outcomeFuture)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 14,
      paddingVertical: 14,
    },
    sectionTitle: {
      flex: 1,
      fontFamily: "Poppins-Regular",
      color: COLORS[colorScheme ?? "light"].text.secondary,
      fontSize: 16,
    },
    wrapper: {
      flex: 1,
      marginTop: 14,
      borderRadius: 6,
      padding: 12,
      alignItems: "center",
      backgroundColor: COLORS[colorScheme ?? "light"].background.secondary,
      overflow: "hidden",
      justifyContent: "center",
    },
    flow: {
      flexDirection: "row",
    },
    flowItem: {
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
    },
    chartItem: {
      flex: 1,
      height: 200,
    },
    flowItemTitle: {
      textAlign: "center",
      fontFamily: "Poppins-Regular",
      color: COLORS[colorScheme ?? "light"].text.primary,
      fontSize: 16,
    },
    flowItemTitleFuture: {
      textAlign: "center",
      fontFamily: "Poppins-Regular",
      color: COLORS[colorScheme ?? "light"].text.secondary,
      fontSize: 14,
    },
    flowAmount: {
      fontFamily: "Nunito-ExtraBold",
      fontSize: 18,
      textAlign: "center",
    },
    flowAmountFuture: {
      fontFamily: "Nunito-ExtraBold",
      fontSize: 14,
      textAlign: "center",
    },
    flowAmountIncome: {
      color: COLORS[colorScheme ?? "light"].green.primary,
    },
    flowAmountOutcome: {
      color: COLORS[colorScheme ?? "light"].red.primary,
    },
  });
