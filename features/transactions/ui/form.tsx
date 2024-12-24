import React, { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, View, Text, Switch, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

export interface FormRef {
  submitForm: () => void;
}

interface FormProps {
  onSubmit: (value: any) => void;
}
function Form({ onSubmit }: FormProps, ref: React.Ref<FormRef>) {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const colorScheme = useThemeColor();
  const {
    container,
    cols,
    col,
    marginLeft,
    marginRight,
    label,
    input,
    error,
    errorBackground,
  } = stylesForm(colorScheme);

  const validationSchema = Yup.object().shape({
    date: Yup.string().required("A data é obrigatória"),
    paid: Yup.boolean().required("Informe se está pago"),
    account: Yup.string().required("A conta é obrigatória"),
    description: Yup.string().required("A descrição é obrigatória"),
    category: Yup.string().required("A categoria é obrigatória"),
    repeat: Yup.string().oneOf(
      ["daily", "weekly", "monthly"],
      "Repetição inválida"
    ),
    tags: Yup.string(),
    notes: Yup.string().max(200, "As notas devem ter no máximo 200 caracteres"),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      date: new Date().toISOString(),
      paid: false,
      account: "",
      description: "",
      category: "",
      repeat: "",
      tags: "",
      notes: "",
    },
  });

  const showHideDatePickerHandler = () => {
    setDatePickerVisibility((value: boolean) => !value);
  };

  const handleConfirm = (date: Date) => {
    setValue("date", date.toISOString());
    setDatePickerVisibility(false);
  };

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

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
                style={[input, errors.date && errorBackground]}
                textAlignVertical="center"
                placeholder="hoje"
                placeholderTextColor={
                  errors.date ? error.color : colorScheme.text.secondary
                }
                onFocus={showHideDatePickerHandler}
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
      {errors.date && <Text style={error}>{errors.date.message}</Text>}
      <Text style={label}>Conta</Text>
      <Controller
        control={control}
        name="account"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[input, errors.account && errorBackground]}
            placeholder="descrição da transação"
            placeholderTextColor={
              errors.account ? error.color : colorScheme.text.secondary
            }
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.account && <Text style={error}>{errors.account.message}</Text>}
      <Text style={label}>Descrição</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[input, errors.description && errorBackground]}
            placeholder="descrição da transação"
            placeholderTextColor={
              errors.description ? error.color : colorScheme.text.secondary
            }
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.description && (
        <Text style={error}>{errors.description.message}</Text>
      )}
      <Text style={label}>Categoria</Text>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[input, errors.category && errorBackground]}
            placeholder="descrição da transação"
            placeholderTextColor={
              errors.category ? error.color : colorScheme.text.secondary
            }
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.category && <Text style={error}>{errors.category.message}</Text>}
      <Text style={label}>Repetir</Text>
      <Controller
        control={control}
        name="repeat"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[input, errors.repeat && errorBackground]}
            placeholder="descrição da transação"
            placeholderTextColor={
              errors.repeat ? error.color : colorScheme.text.secondary
            }
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.repeat && <Text style={error}>{errors.repeat.message}</Text>}
      <Text style={label}>Tags</Text>
      <Controller
        control={control}
        name="tags"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[input, errors.tags && errorBackground]}
            placeholder="descrição da transação"
            placeholderTextColor={
              errors.tags ? error.color : colorScheme.text.secondary
            }
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.tags && <Text style={error}>{errors.tags.message}</Text>}
      <Text style={label}>Observações</Text>
      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[input, errors.notes && errorBackground]}
            placeholder="descrição da transação"
            placeholderTextColor={
              errors.notes ? error.color : colorScheme.text.secondary
            }
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.notes && <Text style={error}>{errors.notes.message}</Text>}
    </View>
  );
}

const stylesForm = (colorScheme: Colors) =>
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
      color: colorScheme.text.secondary,
      fontSize: 16,
    },
    input: {
      flex: 1,
      marginVertical: 14,
      borderRadius: 6,
      padding: 12,
      backgroundColor: colorScheme.background.secondary,
      fontFamily: "Lato-Regular",
      color: colorScheme.text.primary,
      fontSize: 14,
    },
    error: {
      flex: 1,
      fontFamily: "Poppins-SemiBold",
      color: colorScheme.red.primary,
      fontSize: 12,
      marginBottom:6
    },
    errorBackground: {
      color: colorScheme.red.primary,
      backgroundColor: colorScheme.red.secondary,
    },
  });

export default forwardRef(Form);
