import React, { useCallback, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  Calendar,
  CalendarList,
  Agenda,
  DateData,
} from "react-native-calendars";
import { useTranslation } from "react-i18next";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

import { Colors } from "@/constants/theme";

import { formatDate } from "@/utils/date-parser";
import { Direction, MarkedDates } from "react-native-calendars/src/types";
import { useButtonFeedback } from "@/hooks/use-button-feedback";

interface DateTimePickerProps {
  label: string;
  onChange: (date?: Date) => void;
  style?: StyleProp<ViewStyle>;
  value?: Date;
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
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
    contentContainer,
    modalSheetHandle,
    modalSheetHandleArea,
    modalSheetView,
  } = styles(colorScheme);
  const { CloseIcon } = useIcon();

  const showHideDatePickerHandler = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const selectDateHandler = ({ dateString }: DateData) => {
    const [year, month, day] = dateString
      .split("-")
      .map((num: string) => parseInt(num, 10));
    const date: Date = new Date(year, month - 1, day);
    onChange(date);
    useButtonFeedback('medium')
    bottomSheetModalRef.current?.close();
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

  const getValueHandler = (date?: Date): MarkedDates | undefined => {
    if (!date) return;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return {
      [`${year}-${month}-${day}`]: {
        selected: true,
        selectedColor: colorScheme.brand.primary,
        selectedTextColor: colorScheme.text.invert,
      },
    };
  };

  const renderArrow = (direction: Direction) => {
    if (direction === "left") {
      return <Text>{"<"}</Text>;
    } else if (direction === "right") {
      return <Text>{">"}</Text>;
    }
    return null;
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
      </TouchableOpacity>
      {haveError && <Text style={error}>{errorMessage}</Text>}
      <BottomSheetModal
        key={labelText}
        ref={bottomSheetModalRef}
        style={modalSheetView}
        handleIndicatorStyle={modalSheetHandle}
        handleStyle={modalSheetHandleArea}
        enablePanDownToClose
      >
        <BottomSheetView style={contentContainer}>
          <Calendar
            renderArrow={renderArrow}
            onDayPress={selectDateHandler}
            enableSwipeMonths
            markedDates={getValueHandler(value)}
            theme={{
              textMonthFontFamily: "PoppinsMedium",
              textMonthFontSize: 18,
              monthTextColor: colorScheme.text.primary,
              textDayHeaderFontFamily: "PoppinsMedium",
              textDayHeaderFontSize: 12,
              textSectionTitleColor: colorScheme.text.secondary,
              textDayFontFamily: "PoppinsMedium",
              textDayFontSize: 14,
              todayTextColor: colorScheme.text.invert,
              todayBackgroundColor: colorScheme.brand.secondary,
              dayTextColor: colorScheme.text.primary,
              textDisabledColor: colorScheme.text.secondary,
              backgroundColor: colorScheme.background.secondary,
              calendarBackground: colorScheme.background.secondary,
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
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
      fontFamily: "LatoRegular",
      color: colorScheme.text.primary,
      fontSize: 14,
    },
    placeholder: {
      padding: 12,
      flex: 1,
      fontFamily: "LatoRegular",
      color: colorScheme.text.secondary,
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
    clear: {
      padding: 12,
    },
    clearIcon: {
      color: colorScheme.text.secondary,
    },
    modalSheetView: {
      borderTopStartRadius: 6,
      borderTopEndRadius: 6,
      elevation: 3,
      shadowColor: "#333333",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      backgroundColor: colorScheme.background.secondary,
    },
    modalSheetHandleArea: {
      backgroundColor: colorScheme.background.secondary,
    },
    modalSheetHandle: {
      backgroundColor: colorScheme.brand.primary,
    },
    contentContainer: {
      marginHorizontal: 12,
      paddingBottom: 26,
      backgroundColor: colorScheme.background.secondary,
    },
  });
