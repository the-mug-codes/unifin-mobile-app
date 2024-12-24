import * as Haptics from "expo-haptics";

type Feedback = "light" | "medium" | "heavy" | "soft" | "rigid";

export function useButtonFeedback(feedback?: Feedback) {
  if (process.env.EXPO_OS === "ios")
    Haptics.impactAsync(
      (feedback as Haptics.ImpactFeedbackStyle) ??
        Haptics.ImpactFeedbackStyle.Light
    );
}
