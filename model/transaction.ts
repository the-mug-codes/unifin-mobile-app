export type TransactionKind =
  | "income"
  | "expense"
  | "transfer"
  | "credit-card-expense"
  | "credit-card-refund";

export interface TransactionCategory {
  id: string;
  emoji: string;
  name: string;
}

export interface Transaction {
  id: string;
  title: string;
  kind: TransactionKind;
  date: Date;
  amount: number;
  categoryID?: string;
  category?: TransactionCategory;
  reconciledAt?: Date;
}
