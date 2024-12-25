import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getLocales } from "expo-localization";
import { useTranslation } from "react-i18next";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

import { formatDate } from "@/utils/date-parser";

interface DateTimePickerProps {
  label: string;
  onChange: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
  value?: string;
  placeholder?: string;
  haveError?: boolean;
  errorMessage?: string;
  mode?: "date" | "time" | "datetime";
}
export function DateTimePicker({
  style,
  label: labelText,
  errorMessage,
  haveError,
  value,
  placeholder,
  onChange,
  mode = "date",
}: DateTimePickerProps) {
  const { t } = useTranslation();
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const colorScheme = useThemeColor();
  const { label, wrapper, text, error, errorBackground } = styles(colorScheme);

  const showHideDatePickerHandler = () => {
    setDatePickerVisibility((value: boolean) => !value);
  };

  const selectDateHandler = (date: Date) => {
    onChange(date);
    setDatePickerVisibility(false);
  };

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[wrapper, haveError && errorBackground]}
        onPress={showHideDatePickerHandler}
      >
        <Text style={[text, haveError && error]}>
          {value ? formatDate(new Date(value), true) : placeholder}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          locale={getLocales()[0].languageTag}
          mode={mode}
          confirmTextIOS={t("select")}
          cancelTextIOS={t("cancel")}
          onConfirm={(date) => {
            selectDateHandler(date);
          }}
          onCancel={showHideDatePickerHandler}
        />
      </TouchableOpacity>
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
    wrapper: {
      flex: 1,
      marginVertical: 14,
      borderRadius: 6,
      padding: 12,
      backgroundColor: colorScheme.background.secondary,
    },
    text: {
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
