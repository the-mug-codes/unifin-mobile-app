import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

interface BudgetItemProps {
  budget: any;
}
function BudgetItem({}: BudgetItemProps) {
  const colorScheme = useThemeColor();
  const { wrapper } = styles(colorScheme);

  return <View style={wrapper}></View>;
}

interface EmptyListProps {}
function EmptyList({}: EmptyListProps) {
  const colorScheme = useThemeColor();
  const { wrapper } = styles(colorScheme);

  return <View style={wrapper}><Text>cadastara</Text></View>;
}

interface BudgetsWidgetProps {
  budgets: any[];
}
export function BudgetsWidget({ budgets }: BudgetsWidgetProps) {
  const colorScheme = useThemeColor();
  const { sectionTitle } = styles(colorScheme);

  return (
    <FlashList
      data={budgets}
      contentContainerStyle={{paddingHorizontal: 14, paddingVertical:14}}
      renderItem={({ item }) => <BudgetItem budget={item} />}
      ListEmptyComponent={EmptyList}
      ListHeaderComponent={<Text style={sectionTitle}>Meu planejamento</Text>}
      estimatedFirstItemOffset={10}
      keyExtractor={({ id }: any) => id.toString()}
      estimatedItemSize={50}
    />
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    sectionTitle: {
      flex: 1,
      fontFamily: "Poppins-Regular",
      color: colorScheme.text.secondary,
      fontSize: 16,
    },
    wrapper: {
      flex: 1,
      marginTop: 14,
      borderRadius: 6,
      padding: 12,
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: colorScheme.background.primary,
      overflow: "hidden",
    },
  });
