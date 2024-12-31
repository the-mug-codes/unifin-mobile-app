import { Transaction } from "@/model/transaction";

export type Errors = { [key: string]: string };

export type TransactionListVariant = "section" | "transaction" | "blank";

interface TransactionListSection {
  id: number;
  variant: "section";
  amount: number;
  date: Date;
}

interface TransactionListTransaction {
  id: number;
  variant: "transaction";
  transaction: Transaction;
}

interface TransactionListBlank {
  id: number;
  variant: "blank";
}

export type TransactionList =
  | TransactionListSection
  | TransactionListTransaction
  | TransactionListBlank;
