import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ColorSchemeName,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TouchableNativeFeedback,
} from "react-native";
import * as Haptics from "expo-haptics";

import { COLORS, ICONS } from "@/constants/theme";

import { useColorScheme } from "@/hooks/useColorScheme";
import { moneyParser } from "@/utils/money-parser";

interface HomeHeaderProps {
  ballance: number;
}
export function HomeHeader({ ballance }: HomeHeaderProps) {
  const colorScheme = useColorScheme();
  const [showBallance, setShowBallance] = useState<boolean>(true);
  const ballanceIsPositive: boolean = ballance < 0 ? false : true;
  const { NotificationsIcon, MenuIcon, ShowIcon, HideIcon } = ICONS;
  const {
    container,
    wrapper,
    actionArea,
    icon,
    iconShowHide,
    userInfo,
    avatar,
    userInfoHello,
    userInfoName,
    ballanceAmount,
    ballanceContainer,
    ballanceTitle,
    ballanceWrapper,
  } = styles(colorScheme, ballanceIsPositive);

  const showBallanceHandler = useCallback(() => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
    setShowBallance((value: boolean) => !value);
  }, []);

  const showNotificationsHandler = useCallback(() => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, []);

  const showMenuHandler = useCallback(() => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, []);

  const showProfileHandler = useCallback(() => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
  }, []);


  const changeProfilePictureHandler = useCallback(() => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
  }, []);

  return (
    <View style={container}>
      <SafeAreaView style={wrapper}>
        <View style={actionArea}>
          <TouchableOpacity onPress={changeProfilePictureHandler}>
            <Image
              style={avatar}
              source={{
                uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={userInfo} onPress={showProfileHandler}>
            <Text style={userInfoHello}>Olá,</Text>
            <Text style={userInfoName}>Fulano!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showNotificationsHandler}>
            <NotificationsIcon
              width={24}
              height={24}
              style={icon}
              fill={icon.color}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showMenuHandler}>
            <MenuIcon width={24} height={24} style={icon} fill={icon.color} />
          </TouchableOpacity>
        </View>
        <View style={ballanceContainer}>
          <View style={ballanceWrapper}>
            <Text style={ballanceTitle}>Meu saldo</Text>
            <Text style={ballanceAmount}>
              {showBallance ? moneyParser(ballance) : "---"}
            </Text>
            <TouchableNativeFeedback onPress={showBallanceHandler}>
              {showBallance ? (
                <HideIcon
                  width={24}
                  height={24}
                  style={iconShowHide}
                  fill={iconShowHide.color}
                />
              ) : (
                <ShowIcon
                  width={24}
                  height={24}
                  style={iconShowHide}
                  fill={iconShowHide.color}
                />
              )}
            </TouchableNativeFeedback>
          </View>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName, ballanceIsPositive: boolean) =>
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
      marginBottom: 14,
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
      marginHorizontal: 14,
    },
    userInfoHello: {
      fontSize: 14,
      marginBottom: -2,
      color: COLORS[colorScheme ?? "light"].text.invert,
      fontFamily: "Poppins-Regular",
    },
    userInfoName: {
      fontSize: 18,
      marginTop: -2,
      color: COLORS[colorScheme ?? "light"].text.invert,
      fontFamily: "Poppins-SemiBold",
    },
    icon: {
      color: COLORS[colorScheme ?? "light"].brand.secondary,
      marginHorizontal: 8,
    },
    ballanceContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ballanceWrapper: {
      flex: 1,
      marginBottom: 24,
      marginHorizontal: 14,
      borderRadius: 6,
      padding: 12,
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: COLORS[colorScheme ?? "light"].background.primary,
      overflow: "hidden",
    },
    ballanceTitle: {
      fontFamily: "Poppins-SemiBold",
      color: COLORS[colorScheme ?? "light"].text.primary,
      fontSize: 18,
    },
    ballanceAmount: {
      fontFamily: "Nunito-ExtraBold",
      color: ballanceIsPositive
        ? COLORS[colorScheme ?? "light"].green.primary
        : COLORS[colorScheme ?? "light"].red.primary,
      textAlign: "right",
      flex: 1,
      fontSize: 24,
    },
    iconShowHide: {
      color: COLORS[colorScheme ?? "light"].text.secondary,
      marginLeft: 12,
    },
  });
