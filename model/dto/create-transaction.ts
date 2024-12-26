export interface CreateTransactionBasic {
  date: Date;
  kind: "income" | "expense" | "transfer";
  accountID: string;
  description: string;
  amount: number;
  isPaid: boolean;
  categoryID?: string;
  tagsIDs?: string[];
  notes?: string;
  repeat?: {
    recurrence: string;
    limit?: number;
  };
}

export interface CreateTransactionCreditCard {
  date: Date;
  kind: "credit-card-expense" | "credit-card-refund";
  invoiceDueDate: Date;
  accountID: string;
  description: string;
  amount: number;
  isPaid: boolean;
  categoryID?: string;
  tagsIDs?: string[];
  notes?: string;
  repeat?: {
    recurrence: string;
    limit?: number;
  };
}

export type CreateTransaction =
  | CreateTransactionBasic
  | CreateTransactionCreditCard;
