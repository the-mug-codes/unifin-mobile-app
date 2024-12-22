import React from "react";
import { StyleSheet, View, ColorSchemeName, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

import { COLORS } from "@/constants/theme";

import { useColorScheme } from "@/hooks/useColorScheme";
import { FlashList } from "@shopify/flash-list";

interface InvestmentItemProps {
  investment: any;
}
function InvestmentItem({}: InvestmentItemProps) {
  const colorScheme = useColorScheme();
  const { wrapper } = styles(colorScheme);

  return <View style={wrapper}></View>;
}

interface EmptyListProps {}
function EmptyList({}: EmptyListProps) {
  const colorScheme = useColorScheme();
  const { wrapper } = styles(colorScheme);

  return (
    <View style={wrapper}>
      <Text>cadastara</Text>
    </View>
  );
}

interface InvestmentsWidgetProps {
  investments: any[];
}
export function InvestmentsWidget({ investments }: InvestmentsWidgetProps) {
  const colorScheme = useColorScheme();
  const { sectionTitle } = styles(colorScheme);

  return (
    <FlashList
      data={investments}
      contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 14 }}
      renderItem={({ item }) => <InvestmentItem investment={item} />}
      ListEmptyComponent={EmptyList}
      ListHeaderComponent={
        <Text style={sectionTitle}>Minhas contas bancárias</Text>
      }
      estimatedFirstItemOffset={10}
      keyExtractor={({ id }: any) => id.toString()}
      estimatedItemSize={50}
    />
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
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
      flexDirection: "row",
      backgroundColor: COLORS[colorScheme ?? "light"].background.secondary,
      overflow: "hidden",
    },
  });
