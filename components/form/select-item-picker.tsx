import React, { useCallback, useRef } from "react";
import {
  Text,
  StyleSheet,
  Image,
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
import { SvgProps } from "react-native-svg";

export function mapToItemModel<ItemType>(
  items: any[],
  idKey: string,
  displayValueKey: string,
  iconKey?: string
): ItemModel<ItemType>[] {
  return items.map((item) => ({
    id: item[idKey],
    icon: iconKey ? item[iconKey] : undefined,
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
  icon?: any;
  displayValue: string;
  value: ItemType;
}

interface ItemProps<ItemType> {
  item: ItemModel<ItemType>;
  onPress: (value: ItemType) => void;
}
function Item<ItemType>({ item, onPress }: ItemProps<ItemType>) {
  const { icon, displayValue, value }: ItemModel<ItemType> = item;
  const colorScheme = useThemeColor();
  const { itemContent, itemImage, itemContentText } = styles(colorScheme);

  const selectItemHandler = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity
      style={itemContent}
      activeOpacity={0.8}
      onPress={selectItemHandler}
    >
      {icon && <Image style={itemImage} source={{ uri: icon }} />}
      <Text style={itemContentText}>{displayValue}</Text>
    </TouchableOpacity>
  );
}

interface SelectItemPickerProps<ItemType> {
  items: ItemModel<ItemType>[];
  label: string;
  style?: StyleProp<ViewStyle>;
  value?: string;
  icon?: React.FC<SvgProps>;
  placeholder?: string;
  haveError?: boolean;
  errorMessage?: string;
  onChange: (value?: ItemType) => void;
}
export function SelectItemPicker<ItemType>({
  style,
  label: labelText,
  icon: Icon,
  errorMessage,
  haveError,
  value,
  placeholder: placeholderText,
  onChange,
  items,
}: SelectItemPickerProps<ItemType>) {
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const colorScheme = useThemeColor();
  const {
    label,
    wrapper,
    image,
    text,
    icon,
    placeholder,
    error,
    errorBackground,
    modalSheetView,
    modalSheetHandleArea,
    modalSheetHandle,
    contentContainer,
    clear,
    clearIcon,
  } = styles(colorScheme);
  const { CloseIcon } = useIcon();

  const showHideDatePickerHandler = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const selectItemHandler = (value: ItemType) => {
    onChange(value);
    bottomSheetModalRef.current?.close();
  };

  const getValueHandler = (value: string): { icon?: string; value: string } => {
    const selectedItem: ItemModel<ItemType>[] = items.filter(
      ({ id }: ItemModel<ItemType>) => id === value
    );
    if (selectedItem.length != 1) return { icon: undefined, value: "" };
    return { icon: selectedItem[0].icon, value: selectedItem[0].displayValue };
  };

  const clearValuesHandler = () => {
    Alert.alert(t("askRemoveTitle"), t("askRemove"), [
      {
        text: t("keep"),
        style: "default",
      },
      {
        text: t("delete"),
        style: "destructive",
        onPress: () => {
          onChange(undefined);
        },
      },
    ]);
  };

  return (
    <View style={style}>
      <Text style={label}>{labelText}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[wrapper, haveError && errorBackground]}
        onPress={showHideDatePickerHandler}
      >
        {value ? (
          <>
            {getValueHandler(value).icon ? (
              <Image
                style={image}
                source={{ uri: getValueHandler(value).icon }}
              />
            ) : (
              Icon && (
                <Icon
                  width={14}
                  height={14}
                  style={icon}
                  fill={text.color}
                />
              )
            )}
            <Text style={[text, haveError && error]}>
              {getValueHandler(value).value}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={clear}
              onPress={clearValuesHandler}
            >
              <CloseIcon width={12} height={12} fill={clearIcon.color} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {Icon && (
              <Icon
                width={14}
                height={14}
                style={icon}
                fill={placeholder.color}
              />
            )}
            <Text style={[placeholder, haveError && error]}>
              {placeholderText}
            </Text>
          </>
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
              <Item item={item} onPress={selectItemHandler} />
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
      fontFamily: "PoppinsRegular",
      color: colorScheme.text.secondary,
      fontSize: 16,
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 14,
      borderRadius: 6,
      backgroundColor: colorScheme.background.secondary,
    },
    image: {
      width: 24,
      height: 24,
      borderRadius: 24,
      marginLeft: 12,
    },
    text: {
      flex: 1,
      padding: 12,
      fontFamily: "LatoRegular",
      color: colorScheme.text.primary,
      fontSize: 14,
    },
    icon: {
      marginLeft: 12,
    },
    placeholder: {
      padding: 12,
      flex: 1,
      fontFamily: "LatoRegular",
      color: colorScheme.text.secondary,
      fontSize: 14,
    },
    error: {
      flex: 1,
      fontFamily: "PoppinsSemiBold",
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
    itemImage: {
      width: 36,
      height: 36,
      borderRadius: 36,
    },
    itemContentText: {
      fontSize: 18,
      fontFamily: "NunitoBold",
      marginLeft: 6,
      color: colorScheme.text.primary,
    },
    clear: {
      padding: 12,
    },
    clearIcon: {
      color: colorScheme.text.secondary,
    },
  });
