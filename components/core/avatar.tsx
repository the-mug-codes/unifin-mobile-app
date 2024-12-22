import React from "react";
import {
  StyleSheet,
  View,
  ColorSchemeName,
  Image,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import * as Haptics from "expo-haptics";
import Icon from "@expo/vector-icons/MaterialIcons";

import { COLORS, PRIMARY } from "@/constants/colors";

import { useColorScheme } from "@/hooks/useColorScheme";

interface AvatarProps {}
export default function Avatar({}: AvatarProps) {
  const colorScheme = useColorScheme();
  const {
    container,
    avatar,
    notificationIcon,
    userInfo,
    userInfoHello,
    userInfoName,
  } = styles(colorScheme);

  const notificationHandler = (event: GestureResponderEvent) => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
  };

  return (
    <View style={container}>
      <Image
        style={avatar}
        source={{
          uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        }}
      />
      <View style={userInfo}>
        <Text style={userInfoHello}>Olá,</Text>
        <Text style={userInfoName}>Fulano!</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={notificationHandler}
      >
        <Icon name="warning" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      marginVertical: 24,
      marginHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      height: 46,
      width: 46,
      borderRadius: 50,
      backgroundColor: "red",
    },
    userInfo: {
      flex: 1,
      marginHorizontal: 10,
    },
    userInfoHello: {
      fontSize: 14,
      marginBottom: -2,
      fontFamily: "Poppins-Regular",
    },
    userInfoName: {
      fontSize: 18,
      marginTop: -2,
      fontFamily: "Poppins-SemiBold",
    },
    notificationIcon: {
      color: "white",
    },
  });
