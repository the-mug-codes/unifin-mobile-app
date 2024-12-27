import { Theme } from "@react-navigation/native";
import { COLORS } from "@/constants/theme";

const fonts: any = {
  regular: {
    fontFamily: "LatoRegular",
  },
  bold: {
    fontFamily: "LatoBold",
  },
  heavy: {
    fontFamily: "LatoBlack",
  },
};

export interface AppTheme {
  dark: Theme;
  light: Theme;
}

export const THEME: AppTheme = {
  light: {
    dark: false,
    colors: {
      primary: COLORS.light.brand.primary,
      background: COLORS.light.background.primary,
      card: COLORS.light.background.secondary,
      text: COLORS.light.text.primary,
      border: COLORS.light.border.primary,
      notification: COLORS.light.brand.primary,
    },
    fonts,
  },
  dark: {
    dark: true,
    colors: {
      primary: COLORS.dark.brand.primary,
      background: COLORS.dark.background.primary,
      card: COLORS.dark.background.secondary,
      text: COLORS.dark.text.primary,
      border: COLORS.dark.border.primary,
      notification: COLORS.dark.brand.primary,
    },
    fonts,
  },
};