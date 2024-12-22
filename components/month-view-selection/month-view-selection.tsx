import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

import { MONTHS } from "@/constants/date-time";
import { COLORS } from "@/constants/theme";

interface MonthViewSelectionProps {
  selectedDate: (newDate: Date) => void;
}
export function MonthViewSelection({ selectedDate }: MonthViewSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const colorScheme = useColorScheme();

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
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <View style={container}>
      <TouchableOpacity style={navigator} onPress={previousMonthHandler}>
        <Icon name="chevron-left" size={32} style={icon} />
      </TouchableOpacity>
      <View style={info}>
        <Text style={monthText}>{MONTHS[currentMonth]}</Text>
        {MONTHS[currentMonth]}
        {currentYear != new Date().getFullYear() && (
          <Text style={yearText}>{currentYear}</Text>
        )}
      </View>
      <TouchableOpacity style={navigator} onPress={nextMonthHandler}>
        <Icon name="chevron-right" size={32} style={icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderBottomColor: COLORS[colorScheme ?? "light"].border.primary,
      borderBottomWidth: 1,
      backgroundColor: COLORS[colorScheme ?? "light"].background.primary,
    },
    navigator: {
      paddingVertical: 18,
      paddingHorizontal: 12,
    },
    icon: {
      color: COLORS[colorScheme ?? "light"].brand.primary,
    },
    info: {
      flex: 1,
    },
    monthText: {
      fontFamily: "Poppins-Medium",
      color: COLORS[colorScheme ?? "light"].text.primary,
      textAlign: "center",
      fontSize: 18,
    },
    yearText: {
      fontFamily: "Poppins-Regular",
      color: COLORS[colorScheme ?? "light"].text.primary,
      textAlign: "center",
      fontSize: 12,
      marginTop: -2.5,
    },
  });
