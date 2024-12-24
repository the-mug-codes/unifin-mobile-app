import { FC } from "react";
import { SvgProps } from "react-native-svg";

import { Icon, ICONS } from "@/constants/icons";

export function useIcon(): { [key in Icon]: FC<SvgProps> } {
  return ICONS as { [key in Icon]: FC<SvgProps> };
}
