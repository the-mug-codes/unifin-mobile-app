import React, { ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

import { useIcon } from "@/hooks/use-icon";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useButtonFeedback } from "@/hooks/use-button-feedback";

import { moneyParser } from "@/utils/money-parser";
import { formatDate } from "@/utils/date-parser";

import {
  Transaction,
  TransactionCategory,
  TransactionKind,
} from "@/model/transaction";
import { TransactionList } from "@/model/core";

import { Colors } from "@/constants/theme";

interface ItemProps {
  transaction: TransactionList;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
export function Item({ transaction: item, onDelete, onEdit }: ItemProps) {
  const colorScheme = useThemeColor();
  const { t } = useTranslation();
  const { push } = useRouter();
  const { variant } = item;
  const {
    EditIcon,
    DeleteIcon,
    CancelIcon,
    ConfirmIcon,
    ConfirmFillIcon,
    CancelFillIcon,
  } = useIcon();
  const {
    container,
    dateTitleBallanceContainer,
    dateTitle,
    transactionWrapper,
    transactionContainer,
    transactionDetails,
    transactionRight,
    transactionTitle,
    transactionAmount,
    transactionAmountIncome,
    transactionAmountExpense,
    transactionStatusContainer,
    transactionSubtitle,
    transactionSubtitleGreen,
    transactionSubtitleRed,
    actionButton,
    deleteButton,
    editButton,
    reconciledButton,
    unreconciledButton,
    deleteButtonIcon,
    editButtonIcon,
    reconciledButtonIcon,
    unreconciledButtonIcon,
    ballanceWrapper,
    ballanceAmount,
    ballanceAmountGreen,
    ballanceAmountRed,
    ballanceGreen,
    ballanceRed,
  } = styles(colorScheme);
  const slideLeftActions = (id: string) => (
    <>
      <RectButton
        style={[actionButton, deleteButton]}
        onPress={() => {
          useButtonFeedback("heavy");
          onDelete(id);
        }}
      >
        <DeleteIcon width={24} height={24} fill={deleteButtonIcon.color} />
      </RectButton>
      <RectButton
        style={[actionButton, editButton]}
        onPress={() => {
          useButtonFeedback("heavy");
          onEdit(id);
        }}
      >
        <EditIcon width={24} height={24} fill={editButtonIcon.color} />
      </RectButton>
    </>
  );

  const slideRightActions = (id: string, reconciled: boolean) => (
    <RectButton
      style={[actionButton, reconciled ? reconciledButton : unreconciledButton]}
      onPress={() => {
        useButtonFeedback("heavy");
        onEdit(id);
      }}
    >
      {reconciled ? (
        <CancelIcon width={24} height={24} fill={reconciledButtonIcon.color} />
      ) : (
        <ConfirmIcon
          width={24}
          height={24}
          fill={unreconciledButtonIcon.color}
        />
      )}
    </RectButton>
  );

  const titleSection = (date: Date, amount: number) => {
    const ballanceColor = amount >= 0 ? ballanceGreen : ballanceRed;
    const ballanceAmountColor =
      amount >= 0 ? ballanceAmountGreen : ballanceAmountRed;
    return (
      <View style={[dateTitleBallanceContainer]}>
        <Text style={dateTitle}>{`${t("day")} ${formatDate(date)}`}</Text>
        <View style={[ballanceWrapper, ballanceColor]}>
          <Text style={[ballanceAmount, ballanceAmountColor]}>
            {moneyParser(amount)}
          </Text>
        </View>
      </View>
    );
  };
  const getStatus = (kind: TransactionKind, reconciledAt?: Date): string => {
    var action: string;
    switch (kind) {
      case "expense":
        action = t("paid");
        break;
      case "income":
        action = t("received");
        break;
      case "transfer":
        action = t("transferred");
        break;
    }
    if (!reconciledAt) {
      return `${t("not")} ${action}`;
    }
    return action;
  };

  const getCategory = (category?: TransactionCategory): string =>
    category ? category.name.toLowerCase() : t("no category");

  const getAmount = (kind: TransactionKind, amount: number): ReactNode => {
    switch (kind) {
      case "expense":
        return (
          <Text style={[transactionAmount, transactionAmountExpense]}>
            {moneyParser(amount)}
          </Text>
        );
      case "income":
        return (
          <Text style={[transactionAmount, transactionAmountIncome]}>
            {moneyParser(amount)}
          </Text>
        );
      default:
        return <Text style={transactionAmount}>{moneyParser(amount)}</Text>;
    }
  };

  const openDetailsHandler = (id: string) => push(`/transactions/${id}`);

  const transaction = ({
    id,
    kind,
    title,
    amount,
    category,
    reconciledAt,
  }: Transaction) => (
    <View style={[container, transactionWrapper]}>
      <Swipeable
        renderLeftActions={() => slideLeftActions(id)}
        renderRightActions={() => slideRightActions(id, !!reconciledAt)}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={transactionContainer}
          onLongPress={() => openDetailsHandler(id)}
        >
          <View style={transactionDetails}>
            <Text style={transactionTitle}>
              {category ? `${category.emoji} ${title}` : title}
            </Text>
            <Text style={transactionSubtitle}>{getCategory(category)}</Text>
          </View>
          <View style={transactionRight}>
            {getAmount(kind, amount)}
            <View style={transactionStatusContainer}>
              {!!reconciledAt ? (
                <CancelFillIcon
                  width={12}
                  height={12}
                  style={transactionSubtitleRed}
                  fill={transactionSubtitleRed.color}
                />
              ) : (
                <ConfirmFillIcon
                  width={12}
                  height={12}
                  style={transactionSubtitleGreen}
                  fill={transactionSubtitleGreen.color}
                />
              )}
              <Text style={transactionSubtitle}>
                {getStatus(kind, reconciledAt)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );

  switch (variant) {
    case "section":
      return titleSection(item.date, item.amount);
    case "transaction":
      return transaction(item.transaction);
    default:
      return <View style={{ margin: 18 }} />;
  }
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginVertical: 5,
    },
    dateTitleBallanceContainer: {
      margin: 0,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colorScheme.background.primary,
      paddingHorizontal: 12,
      borderBottomColor: colorScheme.border.primary,
      borderBottomWidth: 1,
    },
    dateTitle: {
      flex: 1,
      fontFamily: "PoppinsRegular",
      color: colorScheme.text.secondary,
      fontSize: 16,
    },
    ballanceWrapper: {
      borderRadius: 6,
      padding: 6,
      overflow: "hidden",
      marginVertical: 6,
      alignSelf: "center",
    },
    ballanceAmount: {
      fontFamily: "NunitoExtraBold",
      textAlign: "right",
      fontSize: 14,
    },
    ballanceAmountGreen: {
      color: colorScheme.green.primary,
    },
    ballanceAmountRed: {
      color: colorScheme.red.primary,
    },
    ballanceGreen: {
      backgroundColor: colorScheme.green.secondary,
    },
    ballanceRed: {
      backgroundColor: colorScheme.red.secondary,
    },
    transactionWrapper: {
      borderRadius: 6,
      overflow: "hidden",
    },
    transactionContainer: {
      padding: 12,
      backgroundColor: colorScheme.background.primary,
      flexDirection: "row",
    },
    transactionDetails: {
      flex: 1,
    },
    transactionRight: {
      alignItems: "flex-end",
      justifyContent: "center",
      paddingLeft: 10,
    },
    transactionTitle: {
      fontFamily: "PoppinsSemiBold",
      fontSize: 14,
    },
    transactionAmount: {
      fontFamily: "NunitoExtraBold",
      fontSize: 20,
    },
    transactionAmountIncome: {
      color: colorScheme.green.primary,
    },
    transactionAmountExpense: {
      color: colorScheme.red.primary,
    },
    transactionStatusContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    transactionSubtitle: {
      fontSize: 12,
      fontFamily: "LatoRegular",
      color: colorScheme.text.secondary,
    },
    transactionSubtitleGreen: {
      color: colorScheme.green.primary,
      marginRight: 2,
    },
    transactionSubtitleRed: {
      color: colorScheme.red.primary,
      marginRight: 2,
    },
    actionButton: {
      justifyContent: "center",
      alignItems: "center",
      width: 58,
      height: "100%",
    },
    deleteButton: {
      backgroundColor: colorScheme.red.secondary,
    },
    editButton: {
      backgroundColor: colorScheme.border.primary,
    },
    deleteButtonIcon: {
      color: colorScheme.red.primary,
    },
    editButtonIcon: {
      color: colorScheme.text.primary,
    },
    reconciledButton: {
      backgroundColor: colorScheme.red.secondary,
    },
    unreconciledButton: {
      backgroundColor: colorScheme.green.secondary,
    },
    reconciledButtonIcon: {
      color: colorScheme.red.primary,
    },
    unreconciledButtonIcon: {
      color: colorScheme.green.primary,
    },
  });
