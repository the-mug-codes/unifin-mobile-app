import React, { forwardRef, useImperativeHandle } from "react";
import { StyleSheet, View, Text, Switch, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useThemeColor } from "@/hooks/use-theme-color";

import { DateTimePicker } from "@/components/form/date-picker";
import { InputText } from "@/components/form/input-text";
import { InputTextArea } from "@/components/form/input-textarea";
import {
  mapToItemModel,
  SelectItemPicker,
} from "@/components/form/select-item-picker";

import { Colors } from "@/constants/theme";
import { InputTags } from "@/components/form/input-tags";

export interface FormRef {
  submitForm: () => void;
}

interface FormProps {
  onSubmit: (value: any) => void;
}
function Form({ onSubmit }: FormProps, ref: React.Ref<FormRef>) {
  const { t } = useTranslation();
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
    tags: Yup.array(Yup.string().required()),
    notes: Yup.string().max(200, "As notas devem ter no máximo 200 caracteres"),
  });

  const {
    control,
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
      tags: [],
      notes: "",
    },
  });

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  return (
    <View style={container}>
      <View style={cols}>
        <View style={[col, marginRight]}>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                label={t("date")}
                value={value}
                haveError={!!errors.date}
                errorMessage={errors.date?.message}
                onChange={(value: Date) => onChange(value.toISOString())}
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
                trackColor={{ true: colorScheme.brand.primary }}
              />
            )}
          />
        </View>
      </View>
      {errors.date && <Text style={error}>{errors.date.message}</Text>}
      <Controller
        control={control}
        name="account"
        render={({ field: { onChange, value } }) => (
          <SelectItemPicker<any>
            label={t("account")}
            items={mapToItemModel(
              [
                {
                  id: "1",
                  icon: "https://via.placeholder.com/150", // URL de imagem ou componente
                  displayValue: "Person 1",
                },
                {
                  id: "2",
                  icon: "https://via.placeholder.com/150",
                  displayValue: "Person 2",
                },
                {
                  id: "3",
                  icon: "https://via.placeholder.com/150",
                  displayValue: "Person 3",
                },
              ],
              "id",
              "displayValue",
              "icon",
            )}
            placeholder={t("selectOption")}
            value={value}
            haveError={!!errors.date}
            errorMessage={errors.date?.message}
            onChange={({ id }) => onChange(id)}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <InputText
            label={t("description")}
            placeholder="descrição da transação"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <SelectItemPicker<any>
            label={t("category")}
            items={mapToItemModel(
              [
                {
                  id: "1",
                  displayValue: "Person 1",
                },
                {
                  id: "2",
                  displayValue: "Person 2",
                },
                {
                  id: "3",
                  displayValue: "Person 3",
                },
              ],
              "id",
              "displayValue"
            )}
            placeholder={t("selectOption")}
            value={value}
            haveError={!!errors.date}
            errorMessage={errors.date?.message}
            onChange={({ id }) => onChange(id)}
          />
        )}
      />
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
      <Controller
        control={control}
        name="tags"
        render={({ field: { onChange, value } }) => (
          <InputTags<any>
          label={t("tags")}
          items={mapToItemModel(
            [
              {
                id: "1",
                icon: "https://via.placeholder.com/150", // URL de imagem ou componente
                displayValue: "Person 1",
              },
              {
                id: "2",
                icon: "https://via.placeholder.com/150",
                displayValue: "Person 2",
              },
              {
                id: "3",
                icon: "https://via.placeholder.com/150",
                displayValue: "Person 3",
              },
            ],
            "id",
            "displayValue",
            "icon",
          )}
          placeholder={t("selectOption")}
          value={value}
          haveError={!!errors.tags}
          errorMessage={errors.tags?.message}
          onChange={(value) => onChange(value.map(({id}) => id))}
        />
        )}
      />
      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <InputTextArea
            label={t("notes")}
            placeholder="descrição da transação"
            value={value}
            onChange={onChange}
          />
        )}
      />
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
      marginBottom: 6,
    },
    errorBackground: {
      color: colorScheme.red.primary,
      backgroundColor: colorScheme.red.secondary,
    },
  });

export default forwardRef(Form);
