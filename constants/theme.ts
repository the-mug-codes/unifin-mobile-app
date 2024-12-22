import { FC } from "react";
import { FontSource } from "expo-font";
import { SvgProps } from "react-native-svg";
import ActionIcon from "@/assets/images/icons/action.svg";
import CalendarIcon from "@/assets/images/icons/calendar.svg";
import HomeIcon from "@/assets/images/icons/home.svg";
import IncomeIcon from "@/assets/images/icons/income.svg";
import ExpenseIcon from "@/assets/images/icons/expense.svg";
import SavingsIcon from "@/assets/images/icons/savings.svg";
import TransactionsIcon from "@/assets/images/icons/transactions.svg";
import TransferIcon from "@/assets/images/icons/transfer.svg";
import MenuIcon from "@/assets/images/icons/menu.svg";
import NotificationsIcon from "@/assets/images/icons/notifications.svg";
import ShowIcon from "@/assets/images/icons/show.svg";
import HideIcon from "@/assets/images/icons/hide.svg";

export const FONTS: Record<string, FontSource> = {
  PoppinsBlack: require("../assets/fonts/poppins/Poppins-Black.ttf"),
  PoppinsBlackItalic: require("../assets/fonts/poppins/Poppins-BlackItalic.ttf"),
  PoppinsBold: require("../assets/fonts/poppins/Poppins-Bold.ttf"),
  PoppinsBoldItalic: require("../assets/fonts/poppins/Poppins-BoldItalic.ttf"),
  PoppinsExtraBold: require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
  PoppinsExtraBoldItalic: require("../assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf"),
  PoppinsExtraLight: require("../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
  PoppinsExtraLightItalic: require("../assets/fonts/poppins/Poppins-ExtraLightItalic.ttf"),
  PoppinsItalic: require("../assets/fonts/poppins/Poppins-Italic.ttf"),
  PoppinsLight: require("../assets/fonts/poppins/Poppins-Light.ttf"),
  PoppinsLightItalic: require("../assets/fonts/poppins/Poppins-LightItalic.ttf"),
  PoppinsMedium: require("../assets/fonts/poppins/Poppins-Medium.ttf"),
  PoppinsMediumItalic: require("../assets/fonts/poppins/Poppins-MediumItalic.ttf"),
  PoppinsRegular: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
  PoppinsSemiBold: require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
  PoppinsSemiBoldItalic: require("../assets/fonts/poppins/Poppins-SemiBoldItalic.ttf"),
  PoppinsThin: require("../assets/fonts/poppins/Poppins-Thin.ttf"),
  PoppinsThinItalic: require("../assets/fonts/poppins/Poppins-ThinItalic.ttf"),
  LatoBlack: require("../assets/fonts/lato/Lato-Black.ttf"),
  LatoBlackItalic: require("../assets/fonts/lato/Lato-BlackItalic.ttf"),
  LatoBold: require("../assets/fonts/lato/Lato-Bold.ttf"),
  LatoBoldItalic: require("../assets/fonts/lato/Lato-BoldItalic.ttf"),
  LatoItalic: require("../assets/fonts/lato/Lato-Italic.ttf"),
  LatoLight: require("../assets/fonts/lato/Lato-Light.ttf"),
  LatoLightItalic: require("../assets/fonts/lato/Lato-LightItalic.ttf"),
  LatoRegular: require("../assets/fonts/lato/Lato-Regular.ttf"),
  LatoThin: require("../assets/fonts/lato/Lato-Thin.ttf"),
  LatoThinItalic: require("../assets/fonts/lato/Lato-ThinItalic.ttf"),
  NunitoBlack: require("../assets/fonts/nunito/Nunito-Black.ttf"),
  NunitoBlackItalic: require("../assets/fonts/nunito/Nunito-BlackItalic.ttf"),
  NunitoBold: require("../assets/fonts/nunito/Nunito-Bold.ttf"),
  NunitoBoldItalic: require("../assets/fonts/nunito/Nunito-BoldItalic.ttf"),
  NunitoExtraBold: require("../assets/fonts/nunito/Nunito-ExtraBold.ttf"),
  NunitoExtraBoldItalic: require("../assets/fonts/nunito/Nunito-ExtraBoldItalic.ttf"),
  NunitoExtraLight: require("../assets/fonts/nunito/Nunito-ExtraLight.ttf"),
  NunitoExtraLightItalic: require("../assets/fonts/nunito/Nunito-ExtraLightItalic.ttf"),
  NunitoItalic: require("../assets/fonts/nunito/Nunito-Italic.ttf"),
  NunitoLight: require("../assets/fonts/nunito/Nunito-Light.ttf"),
  NunitoLightItalic: require("../assets/fonts/nunito/Nunito-LightItalic.ttf"),
  NunitoMedium: require("../assets/fonts/nunito/Nunito-Medium.ttf"),
  NunitoMediumItalic: require("../assets/fonts/nunito/Nunito-MediumItalic.ttf"),
  NunitoRegular: require("../assets/fonts/nunito/Nunito-Regular.ttf"),
  NunitoSemiBold: require("../assets/fonts/nunito/Nunito-SemiBold.ttf"),
  NunitoSemiBoldItalic: require("../assets/fonts/nunito/Nunito-SemiBoldItalic.ttf"),
};

type Colors = {
  brand: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    invert: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
  border: {
    primary: string;
    secondary: string;
  };
  green: {
    primary: string;
    secondary: string;
    foreground: string;
  };
  red: {
    primary: string;
    secondary: string;
    foreground: string;
  };
  yellow: {
    primary: string;
    secondary: string;
    foreground: string;
  };
};
export type Color = {
  light: Colors;
  dark: Colors;
};
export const COLORS: Color = {
  light: {
    brand: {
      primary: "#2A637D",
      secondary: "#6FCF97",
    },
    text: {
      primary: "#333333",
      secondary: "#888888",
      invert: "#FFFFFF",
    },
    background: {
      primary: "#F7F7F7",
      secondary: "#FFFFFF",
    },
    border: {
      primary: "#E5E5E5",
      secondary: "#A9A9A9",
    },
    green: {
      primary: "#28A745",
      secondary: "#D4EEDD",
      foreground: "#000000",
    },
    red: {
      primary: "#DC3545",
      secondary: "#F8D7DA",
      foreground: "#FFFFFF",
    },
    yellow: {
      primary: "#FFC107",
      secondary: "#FFF3CD",
      foreground: "#FFFFFF",
    },
  },
  dark: {
    brand: {
      primary: "#2A637D",
      secondary: "#6FCF97",
    },
    text: {
      primary: "#E5E5E5",
      secondary: "#AAAAAA",
      invert: "#000000",
    },
    background: {
      primary: "#121212",
      secondary: "#1E1E1E",
    },
    border: {
      primary: "#333333",
      secondary: "#555555",
    },
    green: {
      primary: "#28A745",
      secondary: "#1F422D",
      foreground: "#FFFFFF",
    },
    red: {
      primary: "#DC3545",
      secondary: "#3D1C1F",
      foreground: "#FFFFFF",
    },
    yellow: {
      primary: "#FFC107",
      secondary: "#4A3F1E",
      foreground: "#000000",
    },
  },
};

export type Icon = {
  ActionIcon: FC<SvgProps>;
  CalendarIcon: FC<SvgProps>;
  HomeIcon: FC<SvgProps>;
  IncomeIcon: FC<SvgProps>;
  ExpenseIcon: FC<SvgProps>;
  SavingsIcon: FC<SvgProps>;
  TransactionsIcon: FC<SvgProps>;
  TransferIcon: FC<SvgProps>;
  MenuIcon: FC<SvgProps>;
  NotificationsIcon: FC<SvgProps>;
  ShowIcon: FC<SvgProps>;
  HideIcon: FC<SvgProps>;
};
export const ICONS: Icon = {
  ActionIcon,
  CalendarIcon,
  HomeIcon,
  IncomeIcon,
  ExpenseIcon,
  SavingsIcon,
  TransactionsIcon,
  TransferIcon,
  MenuIcon,
  NotificationsIcon,
  ShowIcon,
  HideIcon
};
