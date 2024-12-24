import React, { useCallback, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";

import { useThemeColor } from "@/hooks/use-theme-color";

import { Colors } from "@/constants/theme";

export function mapToItemModel<ItemType>(
  items: any[],
  idKey: string,
  iconKey: string,
  displayValueKey: string
): ItemModel<ItemType>[] {
  return items.map((item) => ({
    id: item[idKey],
    icon: item[iconKey] || undefined,
    displayValue: item[displayValueKey],
    value: item,
  }));
}

function ListEmpty() {
  const { t } = useTranslation();

  return <Text>{t("emptyList")}</Text>;
}

interface ItemModel<ItemType> {
  id: string;
  icon?: any;
  displayValue: string;
  value: ItemType;
}

interface ItemProps<ItemType> {
  item: ItemModel<ItemType>;
  onPress: (value: ItemType) => void;
}
function Item<ItemType>({ item, onPress }: ItemProps<ItemType>) {
  const { id, icon, displayValue, value }: ItemModel<ItemType> = item;
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

interface SelectItemPickerProps<ItemType> {
  label: string;
  items: ItemModel<ItemType>[];
  onChange: (value: ItemType) => void;
  style?: StyleProp<ViewStyle>;
  displayValue?: string;
  placeholder?: string;
  haveError?: boolean;
  errorMessage?: string;
}
export function SelectItemPicker<ItemType>({
  style,
  label: labelText,
  errorMessage,
  haveError,
  displayValue,
  placeholder,
  onChange,
  items,
}: SelectItemPickerProps<ItemType>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const colorScheme = useThemeColor();
  const {
    label,
    wrapper,
    text,
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

  const handleConfirm = (value: ItemType) => {
    onChange(value);
    bottomSheetModalRef.current?.close();
  };

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[wrapper, haveError && errorBackground]}
        onPress={showHideDatePickerHandler}
      >
        <Text style={[text, haveError && error]}>
          {displayValue || placeholder}
        </Text>
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
              <Item item={item} onPress={handleConfirm} />
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
      marginVertical: 14,
      borderRadius: 6,
      padding: 12,
      backgroundColor: colorScheme.background.secondary,
    },
    text: {
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
      alignContent: "center",
      justifyContent: "center",
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
