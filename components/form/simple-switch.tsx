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
  const { container, label, error } = styles(colorScheme);

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <View style={container}>
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ true: colorScheme.brand.primary }}
        />
      </View>
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
    container: {
      flex: 1,
      marginVertical: 18,
    },
    error: {
      flex: 1,
      fontFamily: "PoppinsSemiBold",
      color: colorScheme.red.primary,
      fontSize: 12,
      marginBottom: 6,
    },
  });
