import React, { FC, RefObject } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { Colors } from "@/constants/theme";

import { TransactionKind } from "@/model/transaction";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

interface ActionsMenuProps {
  transactionModalRef: RefObject<BottomSheetModal>;
  addTransaction: (kind: TransactionKind) => void;
}
export function ActionsMenu({
  transactionModalRef,
  addTransaction,
}: ActionsMenuProps) {
  const colorScheme = useThemeColor();
  const { ExpenseIcon, IncomeIcon, TransactionsIcon } = useIcon();
  const {
    modalSheetView,
    modalSheetViewContainer,
    modalSheetAction,
    modalSheetActionIcon,
    modalSheetActionText,
    modalSheetActionIncome,
    modalSheetActionExpense,
    modalSheetActionTransfer,
    modalSheetHandle,
    modalSheetHandleArea
  } = styles(colorScheme);

  return (
      <BottomSheetModal
        key="transaction"
        ref={transactionModalRef}
        style={modalSheetView}
        handleIndicatorStyle={modalSheetHandle}
        handleStyle={modalSheetHandleArea}
        enablePanDownToClose
      >
        <BottomSheetView>
          <SafeAreaView>
            <View style={modalSheetViewContainer}>
              <TouchableOpacity
                style={[modalSheetAction, modalSheetActionIncome]}
                activeOpacity={0.8}
                onPress={() => addTransaction("income")}
              >
                <IncomeIcon
                  width={24}
                  height={24}
                  fill={modalSheetActionIcon.color}
                />
                <Text style={modalSheetActionText}>Adicionar receita</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalSheetAction, modalSheetActionExpense]}
                activeOpacity={0.8}
                onPress={() => addTransaction("expense")}
              >
                <ExpenseIcon
                  width={24}
                  height={24}
                  fill={modalSheetActionIcon.color}
                />
                <Text style={modalSheetActionText}>Adicionar despesa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalSheetAction, modalSheetActionTransfer]}
                activeOpacity={0.8}
                onPress={() => addTransaction("transfer")}
              >
                <TransactionsIcon
                  width={24}
                  height={24}
                  fill={modalSheetActionIcon.color}
                />
                <Text style={modalSheetActionText}>
                  Adicionar trnasferencia
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    modalSheetView: {
      borderTopStartRadius: 6,
      borderTopEndRadius: 6,
      elevation: 3,
      shadowColor: "#333333",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      backgroundColor: colorScheme.background.secondary,
    },
    modalSheetViewContainer: {
      padding: 12,
      paddingBottom: 20,
      backgroundColor: colorScheme.background.secondary,
    },
    modalSheetAction: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      marginBottom: 14,
      borderRadius: 6,
      padding: 12,
    },
    modalSheetActionText: {
      fontSize: 18,
      fontFamily: "NunitoBold",
      marginLeft: 6,
      color: colorScheme.button.primary.foreground,
    },
    modalSheetActionIcon: {
      color: colorScheme.button.primary.foreground,
    },
    modalSheetActionIncome: {
      backgroundColor: colorScheme.green.primary,
    },
    modalSheetActionExpense: {
      backgroundColor: colorScheme.red.primary,
    },
    modalSheetActionTransfer: {
      backgroundColor: colorScheme.button.primary.background,
    },
    modalSheetHandleArea: {
      backgroundColor: colorScheme.background.secondary,
    },
    modalSheetHandle: {
      backgroundColor: colorScheme.brand.primary,
    },
  });
