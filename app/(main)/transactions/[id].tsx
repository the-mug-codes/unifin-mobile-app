import React from "react";
import { useLocalSearchParams } from 'expo-router';

import TransactionDescription from "@/features/transactions/transaction-details";

export default function HomeScreen() {
  const { id } = useLocalSearchParams();

  return <TransactionDescription id={id as string} />;
}
