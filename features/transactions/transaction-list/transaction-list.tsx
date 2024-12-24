import React from "react";
import { FlashList } from "@shopify/flash-list";

import { Header } from "@/features/transactions/transaction-list/ui/header";

import { Item } from "@/features/transactions/transaction-list/item/item";
import { Footer as ListFooter } from "@/features/transactions/transaction-list/item/footer";
import { Header as ListHeader } from "@/features/transactions/transaction-list/item/header";
import { Empty as ListEmpty } from "@/features/transactions/transaction-list/item/empty";

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
      <Header />
      <MonthViewSelection selectedDate={console.log} />
      <FlashList
        data={transactions}
        stickyHeaderIndices={dateIDs}
        renderItem={({ item }) => (
          <Item
            transaction={item}
            onDelete={onDeletePress}
            onEdit={onEditPress}
          />
        )}
        ListEmptyComponent={ListEmpty}
        ListHeaderComponent={ListHeader({
          ballance,
          futureBallance,
        })}
        ListFooterComponent={ListFooter({
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
