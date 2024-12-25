import React, { useCallback, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useIcon } from "@/hooks/use-icon";

import { Colors } from "@/constants/theme";

export function mapToItemModel<ItemType>(
  items: any[],
  idKey: string,
  displayValueKey: string
): ItemModel<ItemType>[] {
  return items.map((item) => ({
    id: item[idKey],
    displayValue: item[displayValueKey],
    value: item,
  }));
}

function ListEmpty() {
  const { t } = useTranslation();
  const colorScheme = useThemeColor();
  const { itemContent, itemContentText } = styles(colorScheme);

  return (
    <View style={itemContent}>
      <Text style={itemContentText}>{t("emptyList")}</Text>
    </View>
  );
}

interface ItemModel<ItemType> {
  id: string;
  displayValue: string;
  value: ItemType;
}

interface ItemProps<ItemType> {
  item: ItemModel<ItemType>;
  onPress: (value: ItemType) => void;
}
function Item<ItemType>({ item, onPress }: ItemProps<ItemType>) {
  const { displayValue, value }: ItemModel<ItemType> = item;
  const colorScheme = useThemeColor();
  const { itemContent, itemContentText } = styles(colorScheme);

  const selectItemHandler = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity
      style={itemContent}
      activeOpacity={0.8}
      onPress={selectItemHandler}
    >
      <Text style={itemContentText}>{displayValue}</Text>
    </TouchableOpacity>
  );
}

interface InputTagsProps<ItemType> {
  label: string;
  items: ItemModel<ItemType>[];
  onChange: (value: ItemType[]) => void;
  style?: StyleProp<ViewStyle>;
  value?: string[];
  placeholder?: string;
  haveError?: boolean;
  errorMessage?: string;
}
export function InputTags<ItemType>({
  style,
  label: labelText,
  errorMessage,
  haveError,
  value,
  placeholder:placeholderText,
  onChange,
  items,
}: InputTagsProps<ItemType>) {
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const colorScheme = useThemeColor();
  const { CloseIcon } = useIcon();
  const {
    label,
    wrapper,
    placeholder,
    tag,
    tagText,
    removeTag,
    error,
    errorBackground,
    modalSheetView,
    modalSheetHandleArea,
    modalSheetHandle,
    contentContainer,
  } = styles(colorScheme);

  const showHideDatePickerHandler = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const addItemHandler = (newValue: ItemType) => {
    if (!value) return;
    const existingItems: ItemModel<ItemType>[] = items.filter(
      ({ id }: ItemModel<ItemType>) => value.includes(id)
    );
    const addNew: ItemType[] = existingItems.map(
      ({ value }: ItemModel<ItemType>) => value
    );
    addNew.push(newValue);
    onChange(addNew);
    bottomSheetModalRef.current?.close();
  };

  const removeItemHandler = (idToRemove: string) => {
    Alert.alert(t("askRemoveTitle"), t("askRemove"), [
      {
        text: t("keep"),
        style: "default",
      },
      {
        text: t("delete"),
        style: "destructive",
        onPress: () => {
          if (!value) return;
          const existingItems: ItemModel<ItemType>[] = items.filter(
            ({ id }: ItemModel<ItemType>) => value.includes(id)
          );
          const updatedItems: ItemModel<ItemType>[] = existingItems.filter(
            ({ id }: ItemModel<ItemType>) => id !== idToRemove
          );
          const newItems: ItemType[] = updatedItems.map(
            ({ value }: ItemModel<ItemType>) => value
          );
          onChange(newItems);
        },
      },
    ]);
  };

  const getValueHandler = (
    value: string[]
  ): { id: string; value: string }[] => {
    const selectedItem: ItemModel<ItemType>[] = items.filter(
      ({ id }: ItemModel<ItemType>) => value.includes(id)
    );
    return selectedItem.map(({ id, displayValue }: ItemModel<ItemType>) => ({
      id,
      value: displayValue,
    }));
  };

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[wrapper, haveError && errorBackground]}
        onPress={showHideDatePickerHandler}
      >
        {value && value?.length ? (
          getValueHandler(value).map(({ id, value }) => (
            <TouchableOpacity
              key={id}
              activeOpacity={0.8}
              style={tag}
              onPress={() => removeItemHandler(id)}
            >
              <Text style={[tagText, haveError && error]}>{value}</Text>
              <CloseIcon
                width={12}
                height={12}
                style={removeTag}
                fill={removeTag.color}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={[placeholder, haveError && error, { padding: 6 }]}>
            {placeholderText}
          </Text>
        )}
      </TouchableOpacity>
      {haveError && <Text style={error}>{errorMessage}</Text>}
      <BottomSheetModal
        key={labelText}
        ref={bottomSheetModalRef}
        style={modalSheetView}
        handleIndicatorStyle={modalSheetHandle}
        handleStyle={modalSheetHandleArea}
        enablePanDownToClose
      >
        <BottomSheetView style={contentContainer}>
          <FlashList
            data={items}
            renderItem={({ item }) => (
              <Item item={item} onPress={addItemHandler} />
            )}
            ListEmptyComponent={ListEmpty}
            estimatedFirstItemOffset={10}
            keyExtractor={({ id }) => id}
            estimatedItemSize={50}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = (colorScheme: Colors) =>
  StyleSheet.create({
    label: {
      flex: 1,
      fontFamily: "Poppins-Regular",
      color: colorScheme.text.secondary,
      fontSize: 16,
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 14,
      borderRadius: 6,
      padding: 6,
      backgroundColor: colorScheme.background.secondary,
    },
    placeholder: {
      fontFamily: "Lato-Regular",
      color: colorScheme.text.secondary,
      fontSize: 14,
    },
    tag: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 6,
      paddingVertical: 6,
      paddingLeft: 12,
      backgroundColor: colorScheme.brand.primary,
      margin: 3,
    },
    tagText: {
      fontFamily: "Lato-Bold",
      color: colorScheme.text.invert,
      fontSize: 14,
    },
    removeTag: {
      marginHorizontal: 6,
      color: colorScheme.text.invert,
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
    modalSheetView: {
      borderTopStartRadius: 6,
      borderTopEndRadius: 6,
      elevation: 3,
      shadowColor: "#333333",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      backgroundColor: colorScheme.background.secondary,
    },
    modalSheetHandleArea: {
      backgroundColor: colorScheme.background.secondary,
    },
    modalSheetHandle: {
      backgroundColor: colorScheme.brand.primary,
    },
    contentContainer: {
      height: 240,
      marginHorizontal: 12,
      backgroundColor: colorScheme.background.secondary,
    },
    itemContent: {
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 3,
      borderColor: colorScheme.border.primary,
      borderWidth: 1.4,
      borderRadius: 6,
    },
    itemContentText: {
      fontSize: 18,
      fontFamily: "Nunito-Bold",
      marginLeft: 6,
      color: colorScheme.text.primary,
    },
  });
