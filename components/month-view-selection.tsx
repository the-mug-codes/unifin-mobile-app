import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import { useButtonFeedback } from "@/hooks/use-button-feedback";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

import { Colors } from "@/constants/theme";
import { MONTHS } from "@/constants/date-time";

interface MonthViewSelectionProps {
  selectedDate: (newDate: Date) => void;
}
export function MonthViewSelection({ selectedDate }: MonthViewSelectionProps) {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { LeftIcon, RightIcon } = useIcon();
  const colorScheme = useThemeColor();

  const { container, info, monthText, yearText, navigator, icon } =
    styles(colorScheme);

  const nextMonthHandler = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev: number) => prev + 1);
    } else {
      setCurrentMonth((prev: number) => prev + 1);
    }
    if (process.env.EXPO_OS === "ios") {
      useButtonFeedback("medium");
    }
  };

  const previousMonthHandler = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev: number) => prev - 1);
    } else {
      setCurrentMonth((prev: number) => prev - 1);
    }
    if (process.env.EXPO_OS === "ios") {
      useButtonFeedback("medium");
    }
  };

  return (
    <View style={container}>
      <TouchableOpacity style={navigator} onPress={previousMonthHandler}>
        <LeftIcon width={24} height={24} fill={icon.color} />
      </TouchableOpacity>
      <View style={info}>
        <Text style={monthText}>{t(MONTHS[currentMonth])}</Text>
        {t(MONTHS[currentMonth])}
        {currentYear != new Date().getFullYear() && (
          <Text style={yearText}>{currentYear}</Text>
        )}
      </View>
      <TouchableOpacity style={navigator} onPress={nextMonthHandler}>
        <RightIcon width={24} height={24} fill={icon.color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderBottomColor: colorScheme.border.primary,
      borderBottomWidth: 1,
      backgroundColor: colorScheme.background.primary,
    },
    navigator: {
      paddingVertical: 18,
      paddingHorizontal: 12,
    },
    icon: {
      color: colorScheme.brand.secondary,
    },
    info: {
      flex: 1,
    },
    monthText: {
      fontFamily: "PoppinsMedium",
      color: colorScheme.text.primary,
      textAlign: "center",
      fontSize: 18,
    },
    yearText: {
      fontFamily: "PoppinsRegular",
      color: colorScheme.text.secondary,
      textAlign: "center",
      fontSize: 12,
      marginTop: -2.5,
    },
  });
