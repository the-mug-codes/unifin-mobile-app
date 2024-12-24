import { useState } from "react";

import { TransactionList } from "@/features/transactions/transaction-list/transaction-list";

import { TransactionList as TransactionListItem } from "@/model/core";

const DATA: TransactionListItem[] = [
  { id: 1, variant: "section", date: new Date(), amount: 1222 },
  {
    id: 2,
    variant: "transaction",
    transaction: {
      id: "t1",
      title: "Salário",
      kind: "income",
      date: new Date("2024-01-01"),
      amount: 5000.0,
      categoryID: "c1",
      category: { id: "13", emoji: "🎁", name: "Presentes e Doações" },
      reconciledAt: new Date("2024-01-01"),
    },
  },
  {
    id: 3,
    variant: "transaction",
    transaction: {
      id: "t2",
      title: "Aluguel",
      kind: "expense",
      date: new Date("2024-01-03"),
      amount: -1500.0,
      categoryID: "c2",
    },
  },
  {
    id: 4,
    variant: "transaction",
    transaction: {
      id: "t3",
      title: "Mercado",
      kind: "expense",
      date: new Date("2024-01-05"),
      amount: -800.0,
      categoryID: "c3",
    },
  },
  { id: 12, variant: "blank" },
  { id: 5, variant: "section", amount: 2700.0, date: new Date() },
  {
    id: 7,
    variant: "transaction",
    transaction: {
      id: "t4",
      title: "Bônus",
      kind: "income",
      date: new Date("2024-02-01"),
      amount: 1000.0,
      categoryID: "c1",
    },
  },
  {
    id: 8,
    variant: "transaction",
    transaction: {
      id: "t5",
      title: "Academia",
      kind: "expense",
      date: new Date("2024-02-02"),
      amount: -120.0,
      categoryID: "c4",
    },
  },
  {
    id: 9,
    variant: "transaction",
    transaction: {
      id: "t6",
      title: "Transferência para poupança",
      kind: "transfer",
      date: new Date("2024-02-03"),
      amount: -500.0,
      categoryID: "c5",
    },
  },
  { id: 10, variant: "section", amount: -3080.0, date: new Date() },
  {
    id: 12,
    variant: "transaction",
    transaction: {
      id: "t7",
      title: "Freelance",
      kind: "income",
      date: new Date("2024-03-01"),
      amount: 2000.0,
      categoryID: "c6",
    },
  },
  {
    id: 13,
    variant: "transaction",
    transaction: {
      id: "t8",
      title: "IPTU",
      kind: "expense",
      date: new Date("2024-03-10"),
      amount: -900.0,
      categoryID: "c7",
    },
  },
  {
    id: 14,
    variant: "transaction",
    transaction: {
      id: "t9",
      title: "Compras Online",
      kind: "expense",
      date: new Date("2024-03-12"),
      amount: 400.0,
      categoryID: "c8",
    },
  },
];

export default function NotFoundScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TransactionListItem[]>(DATA);

  const ballance: number = 200;
  const futureBallance: number = 100;

  const onEditHandler = (id: string) => {};

  const onDeleteHandler = (id: string) => {};

  return (
    <TransactionList
      isLoading={isLoading}
      transactions={transactions}
      ballance={ballance}
      futureBallance={futureBallance}
      onDeletePress={onDeleteHandler}
      onEditPress={onEditHandler}
    />
  );
}
