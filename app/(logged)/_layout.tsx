import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { MainMenu } from "@/components/core/main-menu";

interface MainLayoutProps {}
export default function MainLayout({}: MainLayoutProps) {
  const style = styles();

  return (
    <>
      <View style={style.container}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="savings" options={{ headerShown: false }} />
          <Stack.Screen name="calendar" options={{ headerShown: false }} />
          <Stack.Screen
            name="transactions/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="transactions/[id]"
            options={{ headerShown: false, presentation: "modal"}}
          />
          <Stack.Screen
            name="transactions/new/[kind]"
            options={{
              headerShown: false,
              presentation: "modal",
              animation: "slide_from_bottom",
              gestureEnabled: false 
            }}
          />
          <Stack.Screen
            name="transactions/edit/[id]"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </View>
      <MainMenu />
    </>
  );
}

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 0,
    },
  });
