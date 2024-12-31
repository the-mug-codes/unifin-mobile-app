import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ColorSchemeName,
  KeyboardAvoidingView,
  useColorScheme,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import { Button } from "@/components/button";

import Header from "@/features/transactions/ui/header";
import Form from "@/features/transactions/ui/form";
import MoneyInput from "@/features/transactions/ui/money-input";

import { COLORS } from "@/constants/theme";

import { TransactionKind } from "@/model/transaction";

import {
  CreateTransaction,
  CreateTransactionBasic,
  CreateTransactionCreditCard,
} from "@/model/dto/create-transaction";
import { Errors } from "@/model/core";

interface TransactionFormProps {
  kind: TransactionKind;
}
export default function TransactionForm({ kind }: TransactionFormProps) {
  const { t } = useTranslation();
  const { back } = useRouter();
  const colorScheme = useColorScheme();
  const { container, formContainer, footer } = styles(colorScheme);

  const ERRORS: Errors = {
    required: t("errors.required"),
    invalid: t("errors.invalid"),
    notZero: t("errors.notZero"),
    outFromLimitChars: t("errors.outFromLimitChars"),
  };

  const baseTransactionSchema = yup.object({
    date: yup.date().required(ERRORS.required),
    accountID: yup.string().required(ERRORS.required),
    description: yup
      .string()
      .required(ERRORS.required)
      .max(255, ERRORS.outFromLimitChars),
    amount: yup.number().required(ERRORS.required).moreThan(0, ERRORS.notZero),
    isPaid: yup.boolean().required(ERRORS.required),
    categoryID: yup.string().optional(),
    tagsIDs: yup.array().of(yup.string().required(ERRORS.invalid)).optional(),
    notes: yup.string().optional(),
    repeat: yup
      .object()
      .shape({
        recurrence: yup.string().optional(),
        limit: yup
          .number()
          .optional()
          .positive(ERRORS.positive)
          .integer(ERRORS.integer),
      })
      .optional(),
  });

  const basicTransactionSchema: yup.Schema<CreateTransactionBasic> =
    baseTransactionSchema.shape({
      kind: yup
        .string()
        .oneOf(["income", "expense", "transfer"], ERRORS.invalid)
        .required(ERRORS.required),
    });

  const creditCardTransactionSchema: yup.Schema<CreateTransactionCreditCard> =
    baseTransactionSchema.shape({
      kind: yup
        .string()
        .oneOf(["credit-card-expense", "credit-card-refund"], ERRORS.invalid)
        .required(ERRORS.required),
      isPaid: yup.boolean().oneOf([true], ERRORS.invalid).required(),
      invoiceDueDate: yup.date().required(ERRORS.required),
    });

  const validationSchema: yup.Lazy<any> = yup.lazy(
    (values: CreateTransaction) => {
      if (
        values.kind === "income" ||
        values.kind === "expense" ||
        values.kind === "transfer"
      ) {
        return basicTransactionSchema;
      }
      if (
        values.kind === "credit-card-expense" ||
        values.kind === "credit-card-refund"
      ) {
        return creditCardTransactionSchema;
      }
      return yup.mixed().notRequired();
    }
  );

  const form: UseFormReturn<CreateTransaction, any, undefined> =
    useForm<CreateTransaction>({
      resolver: yupResolver<CreateTransaction>(validationSchema),
      defaultValues: {
        date: undefined,
        kind: "income",
        accountID: "",
        description: "",
        amount: 0,
        isPaid: false,
        categoryID: undefined,
        tagsIDs: [],
        notes: undefined,
        repeat: undefined,
      },
    });

  const saveHandler = (formData: CreateTransaction) => {
    try {
      back();
      Toast.show({
        type: "success",
        text1: "Hello",
        text2: "This is some something 👋",
      });
    } catch (error) {}
  };

  const cancelHandler = () => {
    Alert.alert(t("arkCancelTitle"), t("askCancel"), [
      {
        text: t("continue"),
        style: "destructive",
        onPress: back,
      },
      {
        text: t("giveUp"),
        style: "default",
      },
    ]);
  };

  const changeAmountValueHandler = (amount: number) => {
    form.setValue("amount", amount);
    form.trigger("amount");
  };

  useEffect(() => {
    form.setValue("date", new Date());
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={container}>
        <Header kind={kind}>
          <MoneyInput
            haveError={!!form.formState.errors.amount}
            errorMessage={form.formState.errors.amount?.message}
            onChangeValue={changeAmountValueHandler}
          />
        </Header>
        <ScrollView
          contentContainerStyle={formContainer}
          keyboardDismissMode="interactive"
        >
          <Form form={form} />
        </ScrollView>
        <KeyboardAvoidingView
          style={footer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={65}
        >
          <Button
            text="Cancelar"
            variant="tertiary"
            onPressIn={cancelHandler}
          />
          <Button text="Salvar" onPressIn={form.handleSubmit(saveHandler)} />
        </KeyboardAvoidingView>
      </View>
    </BottomSheetModalProvider>
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
