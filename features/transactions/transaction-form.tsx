import React from "react";
import {Text} from 'react-native'
import { TransactionKind } from "@/model/transaction";

interface TransactionFormProps {
    kind: TransactionKind
}
export default function TransactionForm({kind}:TransactionFormProps) {
  return <Text>{kind}</Text>;
}
