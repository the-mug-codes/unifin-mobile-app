import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";
import { useButtonFeedback } from "@/hooks/use-button-feedback";

import { Colors } from "@/constants/theme";

import { TransactionKind } from "@/model/transaction";

interface FloatButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}
export function FloatButton({ onPress }: FloatButtonProps) {
  const colorScheme = useThemeColor();
  const { ActionIcon } = useIcon();
  const {
    floatButtonContainer,
    floatButtonWrapper,
    floatButtonWrapperBorder,
    floatButton,
    floatButtonIcon,
  } = styles(colorScheme);

  const onPressHandler = (event: GestureResponderEvent) => {
    useButtonFeedback("heavy");
    onPress?.(event);
  };

  return (
    <View style={floatButtonContainer}>
      <View style={floatButtonWrapperBorder}>
        <View style={floatButtonWrapper}>
          <TouchableOpacity
            style={floatButton}
            activeOpacity={0.8}
            onPressIn={onPressHandler}
          >
            <ActionIcon width={32} height={32} fill={floatButtonIcon.color} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    container: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderTopColor: colorScheme.border.primary,
      borderTopWidth: 1,
      backgroundColor: colorScheme.background.primary,
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    item: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    itemIcon: {
      color: colorScheme.text.secondary,
    },
    itemIconActive: {
      color: colorScheme.brand.primary,
    },
    floatButtonContainer: {
      width: 80,
      position: "relative",
      backgroundColor: colorScheme.background.primary,
    },
    floatButtonWrapper: {
      width: 80,
      height: 60,
      marginTop: 20,
      backgroundColor: colorScheme.background.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    floatButtonWrapperBorder: {
      position: "absolute",
      top: -32,
      width: 80,
      height: 80,
      borderRadius: 70,
      backgroundColor: colorScheme.background.primary,
      borderColor: colorScheme.border.primary,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    floatButton: {
      position: "absolute",
      top: -8,
      width: 54,
      height: 54,
      borderRadius: 50,
      backgroundColor: colorScheme.brand.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    floatButtonIcon: {
      color: "white",
    },
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
      marginBottom: 20,
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
      fontFamily: "Nunito-Bold",
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
  });
