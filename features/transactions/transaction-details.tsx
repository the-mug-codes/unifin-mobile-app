import React from "react";
import { Text } from "react-native";

interface TransactionDetailsProps {
  id: string;
}
export default function TransactionDetails({ id }: TransactionDetailsProps) {
  return <Text>{id}</Text>;
}
