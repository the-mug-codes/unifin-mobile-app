import React from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Controller, UseFormReturn } from "react-hook-form";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

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
import { CreateTransaction } from "@/model/dto/create-transaction";

interface FormProps {
  form: UseFormReturn<CreateTransaction, any, undefined>;
}
export default function Form({ form }: FormProps) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = form;
  const colorScheme = useThemeColor();
  const {
    ActionIcon,
    CalendarIcon,
    NoteIcon,
    RepeatIcon,
    CategoryIcon,
    TagIcon,
  } = useIcon();
  const { cols, col, marginLeft, marginRight } = stylesForm(colorScheme);

  return (
    <View>
      <View style={cols}>
        <View style={[col, marginRight]}>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                label={t("date")}
                icon={CalendarIcon}
                value={value}
                haveError={!!errors.date}
                placeholder={t("selectOption")}
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
            icon={ActionIcon}
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
            icon={NoteIcon}
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
            icon={CategoryIcon}
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
            icon={RepeatIcon}
            value={value}
            placeholder={t("selectOption")}
            haveError={!!errors.repeat?.recurrence}
            errorMessage={errors.repeat?.recurrence?.message}
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
            icon={TagIcon}
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
            icon={NoteIcon}
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
