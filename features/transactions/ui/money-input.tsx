import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

import { moneyParser } from "@/utils/money-parser";

import { Colors } from "@/constants/theme";

interface MoneyInputProps {
  haveError?: boolean;
  errorMessage?: string;
  onChangeValue: (value: number) => void;
}
export default function MoneyInput({
  onChangeValue,
  errorMessage,
  haveError = false,
}: MoneyInputProps) {
  const [amount, setAmount] = useState(moneyParser(0));
  const colorScheme = useThemeColor();
  const { container, moneyAmount, error } = styles(colorScheme);

  const handleChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue) {
      setAmount(moneyParser(0));
      return;
    }
    const parsedValue = parseFloat(numericValue) / 100;
    setAmount(moneyParser(parsedValue));
  };

  const handleFocus = () => {
    if (amount) {
      const valueWithoutPrefix = amount
        .replace(/[^0-9,.-]/g, "")
        .replace(",", ".");

      const parsedValue = parseFloat(valueWithoutPrefix);
      if (!isNaN(parsedValue)) {
        setAmount(moneyParser(parsedValue));
      }
    }
  };

  const handleBlur = () => {
    if (amount) {
      const numericValue = parseFloat(
        amount.replace(/[^0-9,.-]/g, "").replace(",", ".")
      );
      if (!isNaN(numericValue)) {
        const formattedValue = moneyParser(numericValue);
        setAmount(formattedValue);
        onChangeValue(numericValue);
      }
    }
  };

  return (
    <View style={container}>
      <TextInput
        style={moneyAmount}
        value={amount}
        keyboardType="numeric"
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        caretHidden
      />
      {haveError ? (
        <Text style={error}>{errorMessage}</Text>
      ) : (
        <View style={{ height: 18 }} />
      )}
    </View>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      padding: 12,
    },
    moneyAmount: {
      color: colorScheme.text.invert,
      fontFamily: "NunitoExtraBold",
      textAlign: "right",
      fontSize: 32,
    },
    error: {
      fontFamily: "PoppinsSemiBold",
      textAlign: "right",
      color: colorScheme.text.invert,
      fontSize: 12,
    },
  });
