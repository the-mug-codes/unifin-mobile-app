import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import { useButtonFeedback } from "@/hooks/use-button-feedback";
import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

type Variant = "primary" | "secondary" | "tertiary";

interface ButtonProps {
  text: string;
  variant?: Variant;
  onPressIn: (event: GestureResponderEvent) => void;
}
export function Button({ text, onPressIn, variant = "primary" }: ButtonProps) {
  const colorScheme = useThemeColor();
  const {
    button,
    buttonPrimary,
    buttonSecondary,
    buttonTertiary,
    buttonPrimaryText,
    buttonSecondaryText,
    buttonTertiaryText,
  } = styles(colorScheme);

  const onPressInHandler = (event: GestureResponderEvent) => {
    useButtonFeedback("heavy");
    onPressIn(event);
  };

  const getButtonStyle = (variant: Variant): StyleProp<ViewStyle> => {
    switch (variant) {
      case "secondary":
        return buttonSecondary;
      case "tertiary":
        return buttonTertiary;
      default:
        return buttonPrimary;
    }
  };

  const getButtonTextStyle = (variant: Variant): StyleProp<TextStyle> => {
    switch (variant) {
      case "secondary":
        return buttonSecondaryText;
      case "tertiary":
        return buttonTertiaryText;
      default:
        return buttonPrimaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[button, getButtonStyle(variant)]}
      activeOpacity={0.8}
      onPressIn={onPressInHandler}
    >
      <Text style={getButtonTextStyle(variant)}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
      borderRadius: 6,
      padding: 12,
    },
    buttonPrimary: {
      backgroundColor: colorScheme.button.primary.background,
      marginLeft: 6,
    },
    buttonSecondary: {
      backgroundColor: colorScheme.button.secondary.background,
      marginRight: 6,
    },
    buttonTertiary: {
      backgroundColor: colorScheme.button.tertiary.background,
      marginRight: 6,
    },
    buttonPrimaryText: {
      fontSize: 18,
      fontFamily: "NunitoBold",
      marginLeft: 6,
      color: colorScheme.button.primary.foreground,
    },
    buttonSecondaryText: {
      fontSize: 18,
      fontFamily: "NunitoBold",
      marginLeft: 6,
      color: colorScheme.button.secondary.foreground,
    },
    buttonTertiaryText: {
      fontSize: 18,
      fontFamily: "NunitoBold",
      marginLeft: 6,
      color: colorScheme.button.tertiary.foreground,
    },
  });
