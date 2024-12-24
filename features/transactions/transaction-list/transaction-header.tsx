import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from "@expo/vector-icons/MaterialIcons";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

interface TransactionHeaderProps {}
export function TransactionHeader({}: TransactionHeaderProps) {
  const colorScheme = useThemeColor();
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
      fontFamily: "Poppins-SemiBold",
      color: colorScheme.background.secondary,
      fontSize: 18,
      marginLeft: 8,
    },
    icon: {
      color: colorScheme.background.secondary,
      paddingHorizontal: 8,
    },
  });
