import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TouchableNativeFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";

import { Colors } from "@/constants/theme";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useButtonFeedback } from "@/hooks/use-button-feedback";

import { moneyParser } from "@/utils/money-parser";
import { useIcon } from "@/hooks/use-icon";

interface HomeHeaderProps {
  ballance: number;
}
export function HomeHeader({ ballance }: HomeHeaderProps) {
  const { t } = useTranslation();
  const colorScheme = useThemeColor();
  const [showBallance, setShowBallance] = useState<boolean>(true);
  const ballanceIsPositive: boolean = ballance < 0 ? false : true;
  const { NotificationsIcon, MenuIcon, ShowIcon, HideIcon } = useIcon();
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
    useButtonFeedback("medium");
    setShowBallance((value: boolean) => !value);
  }, []);

  const showNotificationsHandler = useCallback(() => {
    useButtonFeedback("medium");
  }, []);

  const showMenuHandler = useCallback(() => {
    useButtonFeedback("medium");
  }, []);

  const showProfileHandler = useCallback(() => {
    useButtonFeedback("medium");
  }, []);

  const changeProfilePictureHandler = useCallback(() => {
    useButtonFeedback("medium");
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
            <Text style={ballanceTitle}>{t("myBallance")}</Text>
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

const styles = (colorScheme: Colors, ballanceIsPositive: boolean) =>
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
      color: colorScheme.text.invert,
      fontFamily: "PoppinsRegular",
    },
    userInfoName: {
      fontSize: 18,
      marginTop: -2,
      color: colorScheme.text.invert,
      fontFamily: "PoppinsSemiBold",
    },
    icon: {
      color: colorScheme.brand.secondary,
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
      backgroundColor: colorScheme.background.primary,
      overflow: "hidden",
    },
    ballanceTitle: {
      fontFamily: "PoppinsSemiBold",
      color: colorScheme.text.primary,
      fontSize: 18,
    },
    ballanceAmount: {
      fontFamily: "NunitoExtraBold",
      color: ballanceIsPositive
        ? colorScheme.green.primary
        : colorScheme.red.primary,
      textAlign: "right",
      flex: 1,
      fontSize: 24,
    },
    iconShowHide: {
      color: colorScheme.text.secondary,
      marginLeft: 12,
    },
  });
