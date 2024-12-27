import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TextInput,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

interface InputTextProps {
  label: string;
  onChange: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  value?: string;
  placeholder?: string;
  haveError?: boolean;
  errorMessage?: string;
}
export function InputText({
  style,
  label: labelText,
  errorMessage,
  haveError,
  value,
  placeholder,
  onChange,
}: InputTextProps) {
  useState<boolean>(false);
  const colorScheme = useThemeColor();
  const { label, input, error, errorBackground } = styles(colorScheme);

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <TextInput
        style={[input, haveError && errorBackground]}
        placeholder={placeholder}
        placeholderTextColor={
          haveError ? error.color : colorScheme.text.secondary
        }
        value={value}
        onChangeText={onChange}
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
    icon: {
      marginLeft: 12,
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
