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

interface InputTextAreaProps {
  label: string;
  onChange: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  value?: string;
  placeholder?: string;
  haveError?: boolean;
  errorMessage?: string;
  numberOfLines?: number;
}
export function InputTextArea({
  style,
  label: labelText,
  errorMessage,
  haveError,
  value,
  placeholder,
  onChange,
  numberOfLines = 3,
}: InputTextAreaProps) {
  useState<boolean>(false);
  const colorScheme = useThemeColor();
  const { label, input, error, errorBackground } = styles(colorScheme);

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <TextInput
        style={[input, haveError && errorBackground]}
        placeholder={placeholder}
        multiline
        numberOfLines={numberOfLines}
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
      fontFamily: "Poppins-Regular",
      color: colorScheme.text.secondary,
      fontSize: 16,
    },
    input: {
      flex: 1,
      marginVertical: 14,
      borderRadius: 6,
      padding: 12,
      backgroundColor: colorScheme.background.secondary,
      fontFamily: "Lato-Regular",
      color: colorScheme.text.primary,
      fontSize: 14,
    },
    error: {
      flex: 1,
      fontFamily: "Poppins-SemiBold",
      color: colorScheme.red.primary,
      fontSize: 12,
      marginBottom: 6,
    },
    errorBackground: {
      color: colorScheme.red.primary,
      backgroundColor: colorScheme.red.secondary,
    },
  });
