import { useEffect } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import "react-native-reanimated";


import { THEME } from "@/constants/core";
import { FONTS } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme: ColorSchemeName = useColorScheme();
  const [loaded] = useFonts(FONTS);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? THEME.dark : THEME.light}>
      <GestureHandlerRootView>
        <Stack initialRouteName="(logged)">
          <Stack.Screen name="(logged)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
      <StatusBar style="light" />
      <Toast />
    </ThemeProvider>
  );
}
