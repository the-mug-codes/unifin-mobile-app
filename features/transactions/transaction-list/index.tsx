import React from "react";
import { FlashList } from "@shopify/flash-list";

import { TransactionHeader } from "@/features/transactions/transaction-list/transaction-header";
import { TransactionListItem } from "@/features/transactions/transaction-list/transaction-list-item";
import { TransactionListFooter } from "@/features/transactions/transaction-list/transaction-list-footer";
import { TransactionListHeader } from "@/features/transactions/transaction-list/transaction-list-header";
import { TransactionListEmpty } from "@/features/transactions/transaction-list/transaction-list-empty";

import { MonthViewSelection } from "@/components/month-view-selection";

import { TransactionList as TransactionListModel } from "@/model/core";

interface TransactionListProps {
  isLoading: boolean;
  transactions: TransactionListModel[];
  ballance: number;
  futureBallance: number;
  onEditPress: (id: string) => void;
  onDeletePress: (id: string) => void;
}
export function TransactionList({
  isLoading,
  transactions,
  ballance,
  futureBallance,
  onDeletePress,
  onEditPress,
}: TransactionListProps) {
  const dateIDs: number[] = [];

  for (let index = 0; index < transactions.length; index++) {
    if (transactions[index].variant == "section") dateIDs.push(index);
  }

  return (
    <>
      <TransactionHeader />
      <MonthViewSelection selectedDate={console.log} />
      <FlashList
        data={transactions}
        stickyHeaderIndices={dateIDs}
        renderItem={({ item }) => (
          <TransactionListItem
            transaction={item}
            onDelete={onDeletePress}
            onEdit={onEditPress}
          />
        )}
        ListEmptyComponent={TransactionListEmpty}
        ListHeaderComponent={TransactionListHeader({
          ballance,
          futureBallance,
        })}
        ListFooterComponent={TransactionListFooter({
          finalBallance: ballance,
          income: 100,
          outcome: 300,
        })}
        estimatedFirstItemOffset={10}
        keyExtractor={({ id }: TransactionListModel) => id.toString()}
        estimatedItemSize={50}
      />
    </>
  );
}
