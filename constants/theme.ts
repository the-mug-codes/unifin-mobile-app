import { FontSource } from "expo-font";

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

export type Colors = {
  brand: {
    primary: string;
    secondary: string;
  };
  button: {
    primary: {
      foreground: string;
      background: string;
    };
    secondary: {
      foreground: string;
      background: string;
    };
    tertiary: {
      foreground: string;
      background: string;
    };
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
    button: {
      primary: {
        background: "#2A637D",
        foreground: "#FFFFFF",
      },
      secondary: {
        background: "#6FCF97",
        foreground: "#FFFFFF",
      },
      tertiary: {
        background: "#E5E5E5",
        foreground: "#333333",
      },
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
    button: {
      primary: {
        background: "#1B4758",
        foreground: "#FFFFFF",
      },
      secondary: {
        background: "#519E73",
        foreground: "#FFFFFF",
      },
      tertiary: {
        background: "#1A1A1A",
        foreground: "#CCCCCC",
      },
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
