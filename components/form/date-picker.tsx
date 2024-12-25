import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getLocales } from "expo-localization";
import { useTranslation } from "react-i18next";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

import { Colors } from "@/constants/theme";

import { formatDate } from "@/utils/date-parser";

interface DateTimePickerProps {
  label: string;
  onChange: (date?: Date) => void;
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
  placeholder: placeholderText,
  onChange,
  mode = "date",
}: DateTimePickerProps) {
  const { t } = useTranslation();
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const colorScheme = useThemeColor();
  const {
    label,
    wrapper,
    text,
    placeholder,
    error,
    errorBackground,
    clear,
    clearIcon,
  } = styles(colorScheme);
  const { CloseIcon } = useIcon();

  const showHideDatePickerHandler = () => {
    setDatePickerVisibility((value: boolean) => !value);
  };

  const selectDateHandler = (date: Date) => {
    onChange(date);
    setDatePickerVisibility(false);
  };

  const clearValuesHandler = () => {
    Alert.alert(t("askRemoveTitle"), t("askRemove"), [
      {
        text: t("keep"),
        style: "default",
      },
      {
        text: t("delete"),
        style: "destructive",
        onPress: () => {
          onChange(undefined);
        },
      },
    ]);
  };

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[wrapper, haveError && errorBackground]}
        onPress={showHideDatePickerHandler}
      >
        {value ? (
          <>
            <Text style={text}>{formatDate(new Date(value), true)}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={clear}
              onPress={clearValuesHandler}
            >
              <CloseIcon width={12} height={12} fill={clearIcon.color} />
            </TouchableOpacity>
          </>
        ) : (
          <Text style={placeholder}>{placeholderText}</Text>
        )}
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
      flexDirection: "row",
      marginVertical: 14,
      borderRadius: 6,
      backgroundColor: colorScheme.background.secondary,
    },
    text: {
      flex: 1,
      padding: 12,
      fontFamily: "Lato-Regular",
      color: colorScheme.text.primary,
      fontSize: 14,
    },
    placeholder: {
      padding: 12,
      flex: 1,
      fontFamily: "Lato-Regular",
      color: colorScheme.text.secondary,
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
    clear: {
      padding: 12,
    },
    clearIcon: {
      color: colorScheme.text.secondary,
    },
  });
