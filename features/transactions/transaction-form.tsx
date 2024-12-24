import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  ColorSchemeName,
  KeyboardAvoidingView,
  useColorScheme,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/button";

import Header from "@/features/transactions/ui/header";

import { COLORS } from "@/constants/theme";

import { TransactionKind } from "@/model/transaction";
import Form from "./ui/form";

interface TransactionFormProps {
  kind: TransactionKind;
}
export default function TransactionForm({ kind }: TransactionFormProps) {
    const { t } = useTranslation();
  const { back } = useRouter();
  const colorScheme = useColorScheme();
  const { container, formContainer, footer } = styles(colorScheme);
  const formRef = useRef<any>(null);

  const submitFormHandler = () => {
    if (formRef.current) formRef.current.submitForm();
  };

  const saveHandler = () => {
    try {
      back();
      Toast.show({
        type: "success",
        text1: "Hello",
        text2: "This is some something 👋",
      });
    } catch (error) {}
  };

  const cancelHandler = () => back();

  return (
    <View style={container}>
      <Header kind={kind} />
      <ScrollView
        contentContainerStyle={formContainer}
        keyboardDismissMode="interactive"
      >
        <Form ref={formRef} onSubmit={saveHandler} />
      </ScrollView>
      <KeyboardAvoidingView
        style={footer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={65}
      >
        <Button text="Cancelar" variant="tertiary" onPressIn={cancelHandler} />
        <Button text="Salvar" onPressIn={submitFormHandler} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[colorScheme ?? "light"].background.primary,
      marginBottom: 20,
    },
    formContainer: { flexGrow: 1, padding: 12 },
    footer: {
      padding: 12,
      flexDirection: "row",
    },
  });
