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

interface InputTextAreaProps {
  label: string;
  onChange: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  value?: string;
  icon?: React.FC<SvgProps>;
  placeholder?: string;
  haveError?: boolean;
  errorMessage?: string;
}
export function InputTextArea({
  style,
  label: labelText,
  errorMessage,
  haveError,
  value,
  icon: Icon,
  placeholder: placeholderText,
  onChange,
}: InputTextAreaProps) {
  useState<boolean>(false);
  const colorScheme = useThemeColor();
  const { label, wrapper, icon, input, placeholder, error, errorBackground } =
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
                fill={placeholder.color}
              />
            )}
            <TextInput
              style={[input, haveError && error]}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={3}
            />
          </>
        ) : (
          <>
            {Icon && (
              <Icon
                width={14}
                height={14}
                style={icon}
                fill={placeholder.color}
              />
            )}
            <TextInput
              style={[placeholder, haveError && error]}
              placeholder={placeholderText}
              onChangeText={onChange}
              multiline
              numberOfLines={3}
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
      marginVertical: 14,
      borderRadius: 6,
      backgroundColor: colorScheme.background.secondary,
    },
    input: {
      flex: 1,
      padding: 12,
      fontFamily: "LatoRegular",
      color: colorScheme.text.primary,
      fontSize: 14,
    },
    icon: {
      marginLeft: 12,
      marginTop: 12,
      alignSelf: "flex-start",
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
  });
