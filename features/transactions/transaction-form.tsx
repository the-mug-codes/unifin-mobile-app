import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ColorSchemeName,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  useColorScheme,
  ScrollView,
  Switch,
  StyleProp,
  ViewStyle,
  TextInput,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";

import { moneyParser } from "@/utils/money-parser";

import { COLORS } from "@/constants/theme";

import { TransactionKind } from "@/model/transaction";
import { useButtonFeedback } from "@/hooks/use-button-feedback";
import { Button } from "@/components/button";

const MoneyInput = () => {
  const [amount, setAmount] = useState(moneyParser(0));
  const colorScheme = useColorScheme();
  const { headerAmount } = styles(colorScheme);

  const handleChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue) {
      setAmount(moneyParser(0));
      return;
    }
    const parsedValue = parseInt(numericValue, 10) / 100;
    setAmount(moneyParser(parsedValue));
  };

  const handleFocus = () => {
    if (amount) {
      const valueWithoutPrefix = amount
        .replace(/[^0-9,.-]/g, "")
        .replace(",", ".");
      const parsedValue = parseInt(valueWithoutPrefix, 10) / 100;
      setAmount(moneyParser(parsedValue));
    }
  };

  const handleBlur = () => {
    if (amount) {
      const numericValue = parseFloat(amount.replace(/[^0-9.]/g, ""));
      setAmount(moneyParser(numericValue));
    }
  };

  return (
    <TextInput
      style={headerAmount}
      value={amount}
      keyboardType="numeric"
      onChangeText={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      caretHidden
    />
  );
};

interface TransactionFormProps {
  kind: TransactionKind;
}
export default function TransactionForm({ kind }: TransactionFormProps) {
  const [kindSelected, setKindSelected] = useState<TransactionKind>(kind);
  const { back } = useRouter();
  const colorScheme = useColorScheme();
  const {
    container,
    header,
    headerDefault,
    headerExpense,
    headerIncome,
    headerWrapper,
    kindSelector,
    kindSelectorOption,
    kindSelectorText,
    kindSelectorIndicator,
    kindSelectorIndicatorActive,
    formContainer,
    footer,
    action,
    actionPrimary,
    actionSecondary,
    actionPrimaryText,
    actionSecondaryText,
  } = styles(colorScheme);

  const getHeaderColor = (kind: TransactionKind): StyleProp<ViewStyle> => {
    switch (kind) {
      case "expense":
        return headerExpense;
      case "income":
        return headerIncome;
      case "transfer":
        return headerDefault;
      default:
        return headerDefault;
    }
  };

  const setKindHandler = (kind: TransactionKind) => {
    useButtonFeedback("medium");
    setKindSelected(kind);
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

  const cancelHandler = () => {
    back();
  };

  return (
    <View style={container}>
      <View style={[header, getHeaderColor(kindSelected)]}>
        <SafeAreaView style={headerWrapper}>
          <View style={kindSelector}>
            <TouchableOpacity
              style={kindSelectorOption}
              activeOpacity={0.8}
              onPressIn={() => setKindHandler("income")}
              disabled={kindSelected == "income"}
            >
              <Text style={kindSelectorText}>Receita</Text>
              <View
                style={[
                  kindSelectorIndicator,
                  kindSelected == "income" && kindSelectorIndicatorActive,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={kindSelectorOption}
              activeOpacity={0.8}
              onPressIn={() => setKindHandler("expense")}
              disabled={kindSelected == "expense"}
            >
              <Text style={kindSelectorText}>Despesa</Text>
              <View
                style={[
                  kindSelectorIndicator,
                  kindSelected == "expense" && kindSelectorIndicatorActive,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={kindSelectorOption}
              activeOpacity={0.8}
              onPressIn={() => setKindHandler("transfer")}
              disabled={kindSelected == "transfer"}
            >
              <Text style={kindSelectorText}>Tranferência</Text>
              <View
                style={[
                  kindSelectorIndicator,
                  kindSelected == "transfer" && kindSelectorIndicatorActive,
                ]}
              />
            </TouchableOpacity>
          </View>
          <MoneyInput />
        </SafeAreaView>
      </View>
      <ScrollView
        contentContainerStyle={formContainer}
        keyboardDismissMode="interactive"
      >
        <Form />
      </ScrollView>
      <KeyboardAvoidingView
        style={footer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={65}
      >
        <Button text="Cancelar" variant="tertiary" onPressIn={cancelHandler} />
        <Button text="Salvar" onPressIn={saveHandler} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[colorScheme ?? "light"].background.primary,
    },
    header: {
      padding: 12,
    },
    headerIncome: {
      backgroundColor: COLORS[colorScheme ?? "light"].green.primary,
    },
    headerExpense: {
      backgroundColor: COLORS[colorScheme ?? "light"].red.primary,
    },
    headerDefault: {
      backgroundColor: COLORS[colorScheme ?? "light"].brand.primary,
    },
    headerWrapper: {
      flexDirection: "column",
    },
    kindSelector: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    kindSelectorOption: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 6,
      marginBottom: 14,
    },
    kindSelectorText: {
      fontFamily: "Poppins-SemiBold",
      color: COLORS[colorScheme ?? "light"].text.invert,
      textAlign: "center",
      fontSize: 14,
    },
    kindSelectorIndicator: {
      height: 3,
      width: 12,
      borderRadius: 12,
      marginTop: 6,
      backgroundColor: "none",
    },
    kindSelectorIndicatorActive: {
      backgroundColor: COLORS[colorScheme ?? "light"].text.invert,
    },
    headerAmount: {
      color: COLORS[colorScheme ?? "light"].text.invert,
      fontFamily: "Nunito-ExtraBold",
      textAlign: "right",
      fontSize: 32,
      padding: 12,
    },
    formContainer: { flexGrow: 1, padding: 12 },
    footer: {
      padding: 12,
      flexDirection: "row",
    },
    action: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
      borderRadius: 6,
      padding: 12,
    },
    actionPrimary: {
      backgroundColor: COLORS[colorScheme ?? "light"].button.primary.background,
      marginLeft: 6,
    },
    actionSecondary: {
      backgroundColor:
        COLORS[colorScheme ?? "light"].button.tertiary.background,
      marginRight: 6,
    },
    actionPrimaryText: {
      fontSize: 18,
      fontFamily: "Nunito-Bold",
      marginLeft: 6,
      color: COLORS[colorScheme ?? "light"].button.primary.foreground,
    },
    actionSecondaryText: {
      fontSize: 18,
      fontFamily: "Nunito-Bold",
      marginLeft: 6,
      color: COLORS[colorScheme ?? "light"].button.tertiary.foreground,
    },
  });

interface FormProps {}
function Form({}: FormProps) {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const colorScheme = useColorScheme();
  const { container, cols, col, marginLeft, marginRight, label, input } =
    stylesForm(colorScheme);

  const showHideDatePickerHandler = () => {
    setDatePickerVisibility((value: boolean) => !value);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setDatePickerVisibility(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
      paid: false,
      account: "",
      description: "",
      category: "",
      repeat: "",
      tags: "",
      notes: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <View style={container}>
      <View style={cols}>
        <View style={[col, marginRight]}>
          <Text style={label}>Data</Text>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={input}
                textAlignVertical="center"
                placeholder="hoje"
                placeholderTextColor={
                  COLORS[colorScheme ?? "light"].text.secondary
                }
                onFocus={showHideDatePickerHandler}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <View style={marginLeft}>
          <Text style={label}>Pago</Text>
          <Controller
            control={control}
            name="paid"
            render={({ field: { onChange, value } }) => (
              <Switch
                style={{ marginBottom: 20 }}
                value={value}
                onValueChange={onChange}
              />
            )}
          />
        </View>
      </View>
      <Text style={label}>Conta</Text>
      <Controller
        control={control}
        name="account"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={input}
            placeholder="descrição da transação"
            placeholderTextColor={COLORS[colorScheme ?? "light"].text.secondary}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        locale="pt-br"
        mode="datetime"
        confirmTextIOS="Selecionar"
        cancelTextIOS="Cancelar"
        onConfirm={(date) => {
          handleConfirm(date);
        }}
        onCancel={showHideDatePickerHandler}
      />
      <Text style={label}>Descrição</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={input}
            placeholder="descrição da transação"
            placeholderTextColor={COLORS[colorScheme ?? "light"].text.secondary}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={label}>Categoria</Text>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={input}
            placeholder="descrição da transação"
            placeholderTextColor={COLORS[colorScheme ?? "light"].text.secondary}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={label}>Repetir</Text>
      <Controller
        control={control}
        name="repeat"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={input}
            placeholder="descrição da transação"
            placeholderTextColor={COLORS[colorScheme ?? "light"].text.secondary}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={label}>Tags</Text>
      <Controller
        control={control}
        name="tags"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={input}
            placeholder="descrição da transação"
            placeholderTextColor={COLORS[colorScheme ?? "light"].text.secondary}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={label}>Observações</Text>
      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={input}
            placeholder="descrição da transação"
            placeholderTextColor={COLORS[colorScheme ?? "light"].text.secondary}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
    </View>
  );
}

const stylesForm = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {},
    cols: {
      flexDirection: "row",
    },
    col: {
      flex: 1,
    },
    marginRight: {
      marginRight: 6,
    },
    marginLeft: {
      marginLeft: 6,
    },
    label: {
      flex: 1,
      fontFamily: "Poppins-Regular",
      color: COLORS[colorScheme ?? "light"].text.secondary,
      fontSize: 16,
    },
    input: {
      flex: 1,
      marginVertical: 14,
      borderRadius: 6,
      padding: 12,
      backgroundColor: COLORS[colorScheme ?? "light"].background.secondary,
      fontFamily: "Lato-Regular",
      color: COLORS[colorScheme ?? "light"].text.primary,
      fontSize: 14,
    },
  });
