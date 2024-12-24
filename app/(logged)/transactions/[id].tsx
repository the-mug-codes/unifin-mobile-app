import React from "react";
import { useLocalSearchParams } from "expo-router";

import TransactionDetails from "@/features/transactions/transaction-details";

export default function HomeScreen() {
  const { id } = useLocalSearchParams();

  return <TransactionDetails id={id as string} />;
}
