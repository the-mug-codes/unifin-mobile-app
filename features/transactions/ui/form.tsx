import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useThemeColor } from "@/hooks/use-theme-color";

import { DateTimePicker } from "@/components/form/date-picker";
import { InputTags } from "@/components/form/input-tags";
import { RecurrencePicker } from "@/components/form/recurrence-picker";
import { InputText } from "@/components/form/input-text";
import { InputTextArea } from "@/components/form/input-textarea";
import {
  mapToItemModel,
  SelectItemPicker,
} from "@/components/form/select-item-picker";

import { Colors } from "@/constants/theme";
import { SimpleSwitch } from "@/components/form/simple-switch";
import {
  CreateTransaction,
  CreateTransactionBasic,
  CreateTransactionCreditCard,
} from "@/model/dto/create-transaction";

export interface FormRef {
  submitForm: () => void;
}

interface FormProps {
  onSubmit: (value: CreateTransaction) => void;
}
function Form({ onSubmit }: FormProps, ref: Ref<FormRef>) {
  const { t } = useTranslation();
  const colorScheme = useThemeColor();
  const { container, cols, col, marginLeft, marginRight } =
    stylesForm(colorScheme);

  const baseTransactionSchema = yup.object({
    date: yup.date().required("A data é obrigatória"),
    accountID: yup.string().required("O ID da conta é obrigatório"),
    description: yup
      .string()
      .required("A descrição é obrigatória")
      .max(255, "A descrição não pode ter mais de 255 caracteres"),
    amount: yup
      .number()
      .required("O valor é obrigatório")
      .moreThan(0, "O valor deve ser maior que zero"),
    isPaid: yup.boolean().required("O status de pagamento é obrigatório"),
    categoryID: yup.string().optional(),
    tagsIDs: yup.array().of(yup.string().required("Tag inválida")).optional(),
    notes: yup.string().optional(),
    repeat: yup
      .object()
      .shape({
        recurrence: yup.string().required("A recorrência é obrigatória"),
        limit: yup
          .number()
          .optional()
          .positive("O limite deve ser positivo")
          .integer("O limite deve ser inteiro"),
      })
      .optional(),
  });

  const basicTransactionSchema: yup.Schema<CreateTransactionBasic> =
    baseTransactionSchema.shape({
      kind: yup
        .string()
        .oneOf(
          ["income", "expense", "transfer"],
          "Tipo inválido para transação básica"
        )
        .required("O tipo de transação é obrigatório"),
    });

  const creditCardTransactionSchema: yup.Schema<CreateTransactionCreditCard> =
    baseTransactionSchema.shape({
      kind: yup
        .string()
        .oneOf(
          ["credit-card-expense", "credit-card-refund"],
          "Tipo inválido para transação de cartão de crédito"
        )
        .required("O tipo de transação é obrigatório"),
      isPaid: yup
        .boolean()
        .oneOf([true], "Transações de cartão de crédito devem ser pagas")
        .required(),
      invoiceDueDate: yup.date().required("A data é obrigatória"),
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTransaction>({
    resolver: yupResolver<CreateTransaction>(validationSchema),
    defaultValues: {
      date: new Date(),
      kind: "income",
      accountID: "",
      description: "",
      amount: 0,
      isPaid: false,
      categoryID: undefined,
      tagsIDs: undefined,
      notes: undefined,
      repeat: undefined,
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
                onChange={onChange}
              />
            )}
          />
        </View>
        <View style={marginLeft}>
          <Controller
            control={control}
            name="isPaid"
            render={({ field: { onChange, value } }) => (
              <SimpleSwitch
                label={t("paid")}
                value={value}
                haveError={!!errors.isPaid}
                errorMessage={errors.isPaid?.message}
                onChange={onChange}
              />
            )}
          />
        </View>
      </View>
      <Controller
        control={control}
        name="accountID"
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
              "icon"
            )}
            placeholder={t("selectOption")}
            value={value}
            haveError={!!errors.accountID}
            errorMessage={errors.accountID?.message}
            onChange={(value) => onChange(value ? value.id : undefined)}
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
            haveError={!!errors.description}
            errorMessage={errors.description?.message}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="categoryID"
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
            haveError={!!errors.categoryID}
            errorMessage={errors.categoryID?.message}
            onChange={(value) => onChange(value ? value.id : undefined)}
          />
        )}
      />
      <Controller
        control={control}
        name="repeat"
        render={({ field: { onChange, value } }) => (
          <RecurrencePicker
            label={t("repeat")}
            value={value}
            placeholder={t("selectOption")}
            haveError={!!errors.repeat}
            errorMessage={errors.repeat?.message}
            onChange={(recurrence, limit) =>
              onChange(!recurrence ? undefined : { recurrence, limit })
            }
          />
        )}
      />
      <Controller
        control={control}
        name="tagsIDs"
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
              "icon"
            )}
            placeholder={t("selectOption")}
            value={value}
            haveError={!!errors.tagsIDs}
            errorMessage={errors.tagsIDs?.message}
            onChange={(value) => onChange(value.map(({ id }) => id))}
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
            haveError={!!errors.notes}
            errorMessage={errors.notes?.message}
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
  });

export default forwardRef(Form);
