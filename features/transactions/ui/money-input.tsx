import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

import { moneyParser } from "@/utils/money-parser";

import { Colors } from "@/constants/theme";

interface MoneyInputProps {}
export default function MoneyInput({}: MoneyInputProps) {
  const [amount, setAmount] = useState(moneyParser(0));
  const colorScheme = useThemeColor();
  const { moneyAmount } = styles(colorScheme);

  const handleChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue) {
      setAmount(moneyParser(0));
      return;
    }
    const parsedValue = parseInt(numericValue, 10) / 100;
    setAmount(moneyParser(parsedValue));
  };

  const handleFocus = () => {
    if (amount) {
      const valueWithoutPrefix = amount
        .replace(/[^0-9,.-]/g, "")
        .replace(",", ".");
      const parsedValue = parseInt(valueWithoutPrefix, 10) / 100;
      setAmount(moneyParser(parsedValue));
    }
  };

  const handleBlur = () => {
    if (amount) {
      const numericValue = parseFloat(amount.replace(/[^0-9.]/g, ""));
      setAmount(moneyParser(numericValue));
    }
  };

  return (
    <TextInput
      style={moneyAmount}
      value={amount}
      keyboardType="numeric"
      onChangeText={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      caretHidden
    />
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    moneyAmount: {
      color: colorScheme.text.invert,
      fontFamily: "NunitoExtraBold",
      textAlign: "right",
      fontSize: 32,
      padding: 12,
    },
  });
