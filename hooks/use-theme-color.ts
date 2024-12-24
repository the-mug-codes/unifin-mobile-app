import { ColorSchemeName, useColorScheme } from "react-native";

import { Colors, COLORS } from "@/constants/theme";

export function useThemeColor(schema?: ColorSchemeName): Colors {
  const colorScheme = useColorScheme();
  return COLORS[colorScheme ?? schema ?? "light"];
}
