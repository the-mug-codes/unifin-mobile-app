import React from "react";
import {
  StyleSheet,
  View,
  ColorSchemeName,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

import { COLORS } from "@/constants/theme";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";

interface TransactionHeaderProps {}
export function TransactionHeader({}: TransactionHeaderProps) {
  const colorScheme = useColorScheme();
  const { container, wrapper, actionArea, icon, title } = styles(colorScheme);

  return (
    <View style={container}>
      <SafeAreaView style={wrapper}>
        <View style={actionArea}>
          <Text style={title}>Fluxo de Caixa</Text>
          <TouchableOpacity>
            <Icon name="search" size={24} style={icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="more-vert" size={24} style={icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS[colorScheme ?? "light"].brand.primary,
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
      fontFamily: "Poppins-SemiBold",
      color: COLORS[colorScheme ?? "light"].background.secondary,
      fontSize: 18,
      marginLeft: 8,
    },
    icon: {
      color: COLORS[colorScheme ?? "light"].background.secondary,
      paddingHorizontal: 8,
    },
  });
