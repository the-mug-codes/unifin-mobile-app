import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TextInput,
} from "react-native";
import { SvgProps } from "react-native-svg";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

interface InputTextProps {
  label: string;
  onChange: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  value?: string;
  placeholder?: string;
  icon?: React.FC<SvgProps>;
  haveError?: boolean;
  errorMessage?: string;
}
export function InputText({
  style,
  label: labelText,
  errorMessage,
  haveError,
  value,
  icon: Icon,
  placeholder: placeholderText,
  onChange,
}: InputTextProps) {
  useState<boolean>(false);
  const colorScheme = useThemeColor();
  const { label, wrapper, icon, input, placeholder, placeholderError, error, errorBackground } =
    styles(colorScheme);

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <View style={[wrapper, haveError && errorBackground]}>
        {value ? (
          <>
            {Icon && (
              <Icon
                width={14}
                height={14}
                style={icon}
                fill={haveError ? error.color : placeholder.color}
              />
            )}
            <TextInput
              style={[input, haveError && placeholderError]}
              onChangeText={onChange}
              value={value}
            />
          </>
        ) : (
          <>
            {Icon && (
              <Icon
                width={14}
                height={14}
                style={icon}
                fill={haveError ? error.color : placeholder.color}
              />
            )}
            <TextInput
              placeholderTextColor={haveError ? placeholderError.color : placeholder.color}
              style={[placeholder, haveError && placeholderError]}
              placeholder={placeholderText}
              onChangeText={onChange}
            />
          </>
        )}
      </View>
      {haveError && <Text style={error}>{errorMessage}</Text>}
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
      alignItems: "center",
      marginVertical: 14,
      borderRadius: 6,
      backgroundColor: colorScheme.background.secondary,
    },
    input: {
      padding: 12,
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
  });
