import React, { ReactNode } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
  TouchableOpacity,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

import { COLORS } from "@/constants/theme";

import {
  Transaction,
  TransactionCategory,
  TransactionKind,
} from "@/model/transaction";
import { TransactionList } from "@/model/core";

import { moneyParser } from "@/utils/money-parser";
import { formatDate } from "@/utils/date-parser";
import { useRouter } from "expo-router";

interface TransactionListItem {
  transaction: TransactionList;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
export function TransactionListItem({
  transaction: item,
  onDelete,
  onEdit,
}: TransactionListItem) {
  const colorScheme = useColorScheme();
  const { push } = useRouter();
  const { variant } = item;
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
  } = transactionItemStyles(colorScheme);
  const slideLeftActions = (id: string) => (
    <>
      <RectButton
        style={[actionButton, deleteButton]}
        onPress={() => {
          if (process.env.EXPO_OS === "ios") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }
          onDelete(id);
        }}
      >
        <Icon name="delete" size={24} style={deleteButtonIcon} />
      </RectButton>
      <RectButton
        style={[actionButton, editButton]}
        onPress={() => {
          if (process.env.EXPO_OS === "ios") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }
          onEdit(id);
        }}
      >
        <Icon name="edit" size={24} style={editButtonIcon} />
      </RectButton>
    </>
  );

  const slideRightActions = (id: string, reconciled: boolean) => (
    <RectButton
      style={[actionButton, reconciled ? reconciledButton : unreconciledButton]}
      onPress={() => {
        if (process.env.EXPO_OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
        onEdit(id);
      }}
    >
      <Icon
        name={reconciled ? "close" : "done"}
        size={24}
        style={reconciled ? reconciledButtonIcon : unreconciledButtonIcon}
      />
    </RectButton>
  );

  const titleSection = (date: Date, amount: number) => {
    const ballanceColor = amount >= 0 ? ballanceGreen : ballanceRed;
    const ballanceAmountColor =
      amount >= 0 ? ballanceAmountGreen : ballanceAmountRed;
    return (
      <View style={[dateTitleBallanceContainer]}>
        <Text style={dateTitle}>{`dia ${formatDate(date)}`}</Text>
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
        action = "pago";
        break;
      case "income":
        action = "recebido";
        break;
      case "transfer":
        action = "transferido";
        break;
    }
    if (!reconciledAt) {
      return `não ${action}`;
    }
    return action;
  };

  const getCategory = (category?: TransactionCategory): string =>
    category ? category.name.toLowerCase() : "sem categoria";

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

  const openDetailsHandler = (id: string) =>
    push(`/(main)/transactions/new/${id}`);

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
              <Icon
                name={!!reconciledAt ? "check-circle" : "cancel"}
                size={12}
                style={
                  !!reconciledAt
                    ? transactionSubtitleGreen
                    : transactionSubtitleRed
                }
              />
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

const transactionItemStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginVertical: 5,
    },
    dateTitleBallanceContainer: {
      margin: 0,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS[colorScheme ?? "light"].background.primary,
      paddingHorizontal: 12,
      borderBottomColor: COLORS[colorScheme ?? "light"].border.primary,
      borderBottomWidth: 1,
    },
    dateTitle: {
      flex: 1,
      fontFamily: "Poppins-Regular",
      color: COLORS[colorScheme ?? "light"].text.secondary,
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
      fontFamily: "Nunito-ExtraBold",
      textAlign: "right",
      fontSize: 14,
    },
    ballanceAmountGreen: {
      color: COLORS[colorScheme ?? "light"].green.primary,
    },
    ballanceAmountRed: {
      color: COLORS[colorScheme ?? "light"].red.primary,
    },
    ballanceGreen: {
      backgroundColor: COLORS[colorScheme ?? "light"].green.secondary,
    },
    ballanceRed: {
      backgroundColor: COLORS[colorScheme ?? "light"].red.secondary,
    },
    transactionWrapper: {
      borderRadius: 6,
      overflow: "hidden",
    },
    transactionContainer: {
      padding: 12,
      backgroundColor: COLORS[colorScheme ?? "light"].background.primary,
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
      fontFamily: "Poppins-SemiBold",
      fontSize: 14,
    },
    transactionAmount: {
      fontFamily: "Nunito-ExtraBold",
      fontSize: 20,
    },
    transactionAmountIncome: {
      color: COLORS[colorScheme ?? "light"].green.primary,
    },
    transactionAmountExpense: {
      color: COLORS[colorScheme ?? "light"].red.primary,
    },
    transactionStatusContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    transactionSubtitle: {
      fontSize: 12,
      fontFamily: "Lato-Regular",
      color: COLORS[colorScheme ?? "light"].text.secondary,
    },
    transactionSubtitleGreen: {
      color: COLORS[colorScheme ?? "light"].green.primary,
      marginRight: 2,
    },
    transactionSubtitleRed: {
      color: COLORS[colorScheme ?? "light"].red.primary,
      marginRight: 2,
    },
    actionButton: {
      justifyContent: "center",
      alignItems: "center",
      width: 58,
      height: "100%",
    },
    deleteButton: {
      backgroundColor: COLORS[colorScheme ?? "light"].red.secondary,
    },
    editButton: {
      backgroundColor: COLORS[colorScheme ?? "light"].border.primary,
    },
    deleteButtonIcon: {
      color: COLORS[colorScheme ?? "light"].red.primary,
    },
    editButtonIcon: {
      color: COLORS[colorScheme ?? "light"].text.primary,
    },
    reconciledButton: {
      backgroundColor: COLORS[colorScheme ?? "light"].red.secondary,
    },
    unreconciledButton: {
      backgroundColor: COLORS[colorScheme ?? "light"].green.secondary,
    },
    reconciledButtonIcon: {
      color: COLORS[colorScheme ?? "light"].red.primary,
    },
    unreconciledButtonIcon: {
      color: COLORS[colorScheme ?? "light"].green.primary,
    },
  });
