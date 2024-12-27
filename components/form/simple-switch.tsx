import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Switch,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

interface SimpleSwitchProps {
  label: string;
  onChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  value?: boolean;
  haveError?: boolean;
  errorMessage?: string;
}
export function SimpleSwitch({
  style,
  label: labelText,
  errorMessage,
  haveError,
  value,
  onChange,
}: SimpleSwitchProps) {
  useState<boolean>(false);
  const colorScheme = useThemeColor();
  const { label, input, error, errorBackground } = styles(colorScheme);

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colorScheme.brand.primary }}
      />
      {haveError && <Text style={error}>{errorMessage}</Text>}
    </View>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    label: {
      flex: 1,
      fontFamily: "PoppinsRegular",
      color: colorScheme.text.secondary,
      fontSize: 16,
    },
    input: {
      flex: 1,
      marginVertical: 14,
      borderRadius: 6,
      padding: 12,
      backgroundColor: colorScheme.background.secondary,
      fontFamily: "LatoRegular",
      color: colorScheme.text.primary,
      fontSize: 14,
    },
    error: {
      flex: 1,
      fontFamily: "PoppinsSemiBold",
      color: colorScheme.red.primary,
      fontSize: 12,
      marginBottom: 6,
    },
    errorBackground: {
      color: colorScheme.red.primary,
      backgroundColor: colorScheme.red.secondary,
    },
  });
