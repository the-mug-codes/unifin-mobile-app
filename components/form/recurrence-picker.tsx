import React, { useCallback, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

import { Colors } from "@/constants/theme";
import { Button } from "../button";

type Mode = "split" | "fixed";

interface RecurrencePickerProps {
  label: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  value?: string;
  placeholder?: string;
  haveError?: boolean;
  errorMessage?: string;
}
export function RecurrencePicker({
  style,
  label: labelText,
  errorMessage,
  haveError,
  value,
  placeholder: placeholderText,
  onChange,
}: RecurrencePickerProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("split");
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
    placeholder,
    error,
    errorBackground,
    modalSheetView,
    modalSheetHandleArea,
    modalSheetHandle,
    contentContainer,
    clear,
    clearIcon,
  } = styles(colorScheme);

  const showHideDatePickerHandler = (mode: Mode) => {
    setMode(mode);
    bottomSheetModalRef.current?.present();
  };

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <View style={container}>
        {!value && (
          <>
            <TouchableOpacity
              style={button}
              onPress={() => showHideDatePickerHandler("split")}
              activeOpacity={0.8}
            >
              <Text style={buttonText}>{t("split")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[button, { marginHorizontal: 12 }]}
              onPress={() => showHideDatePickerHandler("fixed")}
              activeOpacity={0.8}
            >
              <Text style={buttonText}>{t("fixed")}</Text>
            </TouchableOpacity>
          </>
        )}
        <View style={[wrapper, haveError && errorBackground]}>
          {value ? (
            <>
              <Text style={text}>VALUE</Text>
              <TouchableOpacity activeOpacity={0.8} style={clear}>
                <CloseIcon width={12} height={12} fill={clearIcon.color} />
              </TouchableOpacity>
            </>
          ) : (
            <Text style={placeholder}>{placeholderText}</Text>
          )}
        </View>
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
          <Text></Text>
        </BottomSheetView>
      </BottomSheetModal>
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
    container: {
      flexDirection: "row",
      marginVertical: 14,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 6,
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: colorScheme.button.tertiary.background,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: "Nunito-Bold",
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
      height: 240,
      marginHorizontal: 12,
      backgroundColor: colorScheme.background.secondary,
    },
    clear: {
      padding: 12,
    },
    clearIcon: {
      color: colorScheme.text.secondary,
    },
  });
