import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { SvgProps } from "react-native-svg";
import { Picker } from "@react-native-picker/picker";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

import { Colors } from "@/constants/theme";
import { Button } from "../button";
import { RECURRENCE } from "@/constants/date-time";

type Mode = "split" | "fixed";

interface RecurrencePickerProps {
  label: string;
  onChange: (recurrence?: string, limit?: number) => void;
  style?: StyleProp<ViewStyle>;
  value?: { recurrence?: string; limit?: number };
  placeholder?: string;
  icon?: React.FC<SvgProps>;
  haveError?: boolean;
  errorMessage?: string;
}
export function RecurrencePicker({
  style,
  label: labelText,
  errorMessage,
  haveError,
  value,
  icon: Icon,
  placeholder: placeholderText,
  onChange,
}: RecurrencePickerProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("split");
  const [selectedRecurrence, setSelectedRecurrence] = useState<number>(3);
  const [selectedRecurrenceLimit, setSelectedRecurrenceLimit] =
    useState<number>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const colorScheme = useThemeColor();
  const { CloseIcon } = useIcon();
  const {
    label,
    container,
    button,
    buttonText,
    wrapper,
    text,
    icon,
    placeholder,
    placeholderError,
    error,
    errorBackground,
    modalSheetView,
    modalSheetHandleArea,
    modalSheetHandle,
    contentContainer,
    row,
    col,
    clear,
    clearIcon,
  } = styles(colorScheme);

  const showRecurrencePickerHandler = (mode: Mode) => {
    setMode(mode);
    if (mode == "split") {
      setSelectedRecurrenceLimit(2);
    } else {
      setSelectedRecurrenceLimit(0);
    }
    bottomSheetModalRef.current?.present();
  };

  const hideRecurrencePickerHandler = () => {
    bottomSheetModalRef.current?.close();
  };

  const selectRecurrenceHandler = () => {
    onChange(RECURRENCE[selectedRecurrence], selectedRecurrenceLimit);
    hideRecurrencePickerHandler();
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
          onChange(undefined, undefined);
        },
      },
    ]);
  };

  const getValueHandler = (recurrence?: string, limit?: number): string => {
    if (!recurrence) return "";
    if (!limit)
      return `${t("repeatTransaction")} ${t(
        `calendar.recurrence.${recurrence}`
      )}`;
    return `${t("repeatTransaction")} ${limit}x (${t(
      `calendar.recurrence.${recurrence}`
    )})`;
  };

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <View style={container}>
        {!value ? (
          <>
            <TouchableOpacity
              style={button}
              onPress={() => showRecurrencePickerHandler("split")}
              activeOpacity={0.8}
            >
              <Text style={buttonText}>{t("split")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[button, { marginLeft: 12 }]}
              onPress={() => showRecurrencePickerHandler("fixed")}
              activeOpacity={0.8}
            >
              <Text style={buttonText}>{t("fixed")}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={[wrapper, haveError && errorBackground]}>
            {Icon && (
              <Icon
                width={14}
                height={14}
                style={icon}
                fill={haveError ? error.color : placeholder.color}
              />
            )}
            <Text style={haveError ? placeholderError : text}>
              {getValueHandler(value.recurrence, value.limit)}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={clear}
              onPress={clearValuesHandler}
            >
              <CloseIcon
                width={12}
                height={12}
                fill={haveError ? error.color : clearIcon.color}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
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
          {mode == "fixed" ? (
            <Picker
              selectedValue={selectedRecurrence}
              onValueChange={setSelectedRecurrence}
            >
              {RECURRENCE.map((recurrence: string, index: number) => (
                <Picker.Item
                  key={recurrence}
                  label={t(recurrence)}
                  value={index}
                />
              ))}
            </Picker>
          ) : (
            <>
              <View style={row}>
                <View style={col}>
                  <Picker
                    style={{ width: "100%" }}
                    selectedValue={selectedRecurrenceLimit}
                    onValueChange={setSelectedRecurrenceLimit}
                  >
                    {[...Array(98)].map((_, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={`${index + 2}x`}
                          value={index + 2}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View style={col}>
                  <Picker
                    selectedValue={selectedRecurrence}
                    onValueChange={setSelectedRecurrence}
                  >
                    {RECURRENCE.map((recurrence: string, index: number) => (
                      <Picker.Item
                        key={recurrence}
                        label={t(recurrence)}
                        value={index}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </>
          )}
          <View style={{ flexDirection: "row" }}>
            <Button
              text={t("cancel")}
              variant="tertiary"
              onPressIn={hideRecurrencePickerHandler}
            />
            <Button text={t("confirm")} onPressIn={selectRecurrenceHandler} />
          </View>
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
    container: {
      flexDirection: "row",
      marginVertical: 14,
    },
    button: {
      flex:1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 6,
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: colorScheme.button.tertiary.background,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: "NunitoBold",
      color: colorScheme.button.tertiary.foreground,
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 6,
      backgroundColor: colorScheme.background.secondary,
    },
    text: {
      padding: 12,
      flex: 1,
      fontFamily: "LatoRegular",
      color: colorScheme.text.primary,
      fontSize: 14,
    },
    icon: {
      marginLeft: 12,
    },
    placeholder: {
      padding: 12,
      flex: 1,
      fontFamily: "LatoRegular",
      color: colorScheme.text.secondary,
      fontSize: 14,
    },
    placeholderError: {
      color: colorScheme.red.primary,
      fontFamily: "LatoSemiBold",
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
      height: 300,
      paddingHorizontal: 12,
      backgroundColor: colorScheme.background.secondary,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    col: {
      flex: 1,
      overflow: "hidden",
    },
    clear: {
      padding: 12,
    },
    clearIcon: {
      color: colorScheme.text.secondary,
    },
  });
