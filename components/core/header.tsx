import React from "react";
import { StyleSheet, View, ColorSchemeName, SafeAreaView } from "react-native";

import Avatar from "@/components/core/avatar";

import { COLORS, PRIMARY } from "@/constants/colors";

import { useColorScheme } from "@/hooks/useColorScheme";

interface HeaderProps {}
export default function Header({}: HeaderProps) {
  const colorScheme = useColorScheme();
  const { container, wrapper } = styles(colorScheme);

  return (
    <View style={container}>
      <SafeAreaView style={wrapper}>
        <Avatar />
      </SafeAreaView>
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderBottomColor: PRIMARY.lightGray,
      borderBottomWidth: 1,
      backgroundColor: COLORS[colorScheme ?? "light"].background,
    },
    wrapper: {
      flex: 1,
    },
  });
