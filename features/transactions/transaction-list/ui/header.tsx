import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

import { Colors } from "@/constants/theme";

interface HeaderProps {}
export function Header({}: HeaderProps) {
  const { t } = useTranslation();
  const { SearchIcon, MenuIcon } = useIcon();
  const colorScheme = useThemeColor();
  const { container, wrapper, actionArea, icon, title } = styles(colorScheme);

  return (
    <View style={container}>
      <SafeAreaView style={wrapper}>
        <View style={actionArea}>
          <Text style={title}>{t("cashFlow")}</Text>
          <TouchableOpacity>
            <SearchIcon width={24} height={24} style={icon} fill={icon.color} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MenuIcon width={24} height={24} style={icon} fill={icon.color} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colorScheme.brand.primary,
    },
    wrapper: {
      flex: 1,
    },
    actionArea: {
      flexDirection: "row",
      marginHorizontal: 14,
      marginVertical: 20,
    },
    title: {
      flex: 1,
      fontFamily: "PoppinsSemiBold",
      color: colorScheme.text.invert,
      fontSize: 18,
      marginLeft: 8,
    },
    icon: {
      color: colorScheme.brand.secondary,
      marginHorizontal: 8,
    },
  });
