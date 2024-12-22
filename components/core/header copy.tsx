import React, { ReactNode, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ColorSchemeName,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import * as Haptics from "expo-haptics";
import PagerView from "react-native-pager-view";
import { Feather } from "@expo/vector-icons";

import { COLORS, PRIMARY } from "@/constants/colors";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Account } from "@/model/account";

interface UserAvatarProps {}
function UserAvatar() {
  const colorScheme = useColorScheme();
  const style = userAvatarStyles(colorScheme);

  return (
    <View style={style.container}>
      <Image
        style={style.avatar}
        source={{
          uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        }}
      />
      <View style={style.userInfo}>
        <Text style={style.userInfoHello}>Olá,</Text>
        <Text style={style.userInfoName}>Fulano!</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={(event: GestureResponderEvent) => {
          if (process.env.EXPO_OS === "ios") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }
        }}
      >
        <Feather name="alert-triangle" size={24} />
      </TouchableOpacity>
    </View>
  );
}

interface HeaderProps {
  cards: Account[];
}
export default function Header({ cards }: HeaderProps) {
  const { width } = Dimensions.get("window");
  const [currentCard, setCurrentCard] = useState<number>(0);
  const colorScheme = useColorScheme();
  const style = styles(colorScheme, width);

  const cardChangeHandler = (event: { nativeEvent: { position: number } }) => {
    setCurrentCard(event.nativeEvent.position);
  };

  return (
    <View style={style.container}>
      <SafeAreaView style={style.header}>
        <UserAvatar />
        {cards.length && (
          <View style={style.cardsWrapper}>
            <PagerView
              style={style.cardsContainer}
              initialPage={1}
              onPageSelected={cardChangeHandler}
            >
              {cards.map(
                ({ balance, icon, kind, name }: Account, index: number) => (
                  <View style={style.card} key={index}>
                    <View style={style.cardContent}>
                      <Image
                        style={style.cardIcon}
                        source={{
                          uri: "https://static.poder360.com.br/2021/12/nubank-1080-e1639088985285.png",
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={style.accountKind}>{kind}</Text>
                        <Text style={style.accountName}>{name}</Text>
                        <Text style={style.accountBallance}>{balance}</Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPressIn={(event: GestureResponderEvent) => {
                          if (process.env.EXPO_OS === "ios") {
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Medium
                            );
                          }
                        }}
                      >
                        <Feather name="more-horizontal" size={20} color="gray" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}
            </PagerView>
          </View>
        )}
        <View style={style.cardsIndicator}>
          {cards.map((_, index: number) => (
            <View
              key={index}
              style={
                index === currentCard
                  ? style.cardActiveIndicator
                  : style.cardIndicator
              }
            />
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName, width: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: PRIMARY.tealBlue,
      paddingTop: 0,
      shadowColor: "#333333",
      shadowOffset: { width: 0, height: -10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      borderBottomStartRadius: 18,
      borderBottomEndRadius: 18,
      zIndex: 5000,
    },
    header: {
      height: "auto",
    },
    cardsWrapper: {
      overflow: "visible",
      marginTop: 18,
    },
    cardsContainer: {
      height: 100,
      overflow: "visible",
    },
    card: {
      padding: 20,
      marginHorizontal: 20,
      borderRadius: 12,
      backgroundColor: "white",
      shadowColor: "#333333",
      shadowOffset: { width: 0, height: -10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      borderBottomStartRadius: 18,
      borderBottomEndRadius: 18,
    },
    cardContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    cardIcon: {
      borderRadius: 8,
      width: 60,
      height: 60,
      marginRight: 20,
      overflow: "hidden",
    },
    accountKind: {
      color: "gray",
      fontWeight: "bold",
    },
    accountName: {
      fontSize: 18,
      fontWeight: "semibold",
    },
    accountBallance: {
      fontSize: 24,
      fontWeight: "bold",
    },
    cardsIndicator: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 20,
      flexDirection: "row",
    },
    cardIndicator: {
      height: 6,
      width: 6,
      borderRadius: 6,
      backgroundColor: "white",
      marginHorizontal: 1.5,
    },
    cardActiveIndicator: {
      height: 6,
      width: 20,
      borderRadius: 6,
      backgroundColor: "white",
      marginHorizontal: 3,
    },
  });

const userAvatarStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      height: 50,
      width: 50,
      borderRadius: 50,
      backgroundColor: "red",
    },
    userInfo: {
      flex: 1,
      color: "white",
      marginHorizontal: 10,
    },
    userInfoName: {
      fontSize: 24,
      marginTop: -2,
      fontWeight: "semibold",
    },
    userInfoHello: {
      fontSize: 18,
      marginBottom: -2,
      fontWeight: "semibold",
    },
    notificationIcon: {
      color: "white",
    },
  });
