import React from "react";
import { useLocalSearchParams } from "expo-router";

import TransactionForm from "@/features/transactions/transaction-form";

import { TransactionKind } from "@/model/transaction";

export default function HomeScreen() {
  const { kind } = useLocalSearchParams();

  return <TransactionForm kind={kind as TransactionKind} />;
}
