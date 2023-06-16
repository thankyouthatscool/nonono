import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { CatalogItem } from "@nonono/inertiion-backend";
import { useEffect, useCallback, useState } from "react";
import { Dimensions, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { useAppDispatch } from "@hooks";
import { setBottomSheetContent } from "@store";
import { DEFAULT_APP_PADDING } from "@theme";

import { BottomButterWrapper } from "./Styled";

const { width: screenWidth } = Dimensions.get("screen");

const NEW_CATALOG_NULL_DATA = {
  code: "",
  color: "",
  size: "",
  description: "",
  location: "",
};

export const NewCatalogItemForm = () => {
  const dispatch = useAppDispatch();

  const [newCatalogItemData, setNewCatalogItemData] = useState<
    Omit<CatalogItem, "itemId" | "dateCreated" | "dateModified">
  >(NEW_CATALOG_NULL_DATA);

  const handleNewCatalogItemSave = useCallback(() => {
    dispatch(setBottomSheetContent(null));
  }, [newCatalogItemData]);

  const handleUpdateNewCatalogItemData = useCallback(
    // TODO: Keys of the type
    (
      key: "code" | "color" | "size" | "description" | "location",
      data: string
    ) => {
      setNewCatalogItemData((newCatalogItemData) => ({
        ...newCatalogItemData,
        [key]: data,
      }));
    },
    []
  );

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        width: screenWidth - DEFAULT_APP_PADDING * 2,
      }}
    >
      <View style={{ padding: DEFAULT_APP_PADDING }}>
        <Text variant="titleLarge">New Catalog Item</Text>
        <TextInput
          label="Item Code"
          mode="outlined"
          onChangeText={(newCatalogItemCode) =>
            handleUpdateNewCatalogItemData("code", newCatalogItemCode)
          }
        />
        <TextInput
          label="Color(s)"
          mode="outlined"
          placeholder="Comma separated"
        />
        <TextInput
          label="Size(s)"
          mode="outlined"
          placeholder="Comma separated"
        />
        <TextInput label="Size(s)" mode="outlined" />
        <TextInput
          label="Description"
          mode="outlined"
          multiline
          numberOfLines={3}
        />
        <TextInput label="Location" mode="outlined" />
        <BottomButterWrapper>
          <Button
            mode="contained-tonal"
            onPress={() => {
              dispatch(setBottomSheetContent(null));

              setNewCatalogItemData(() => NEW_CATALOG_NULL_DATA);
            }}
            style={{ marginRight: DEFAULT_APP_PADDING }}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              handleNewCatalogItemSave();
            }}
          >
            Save
          </Button>
        </BottomButterWrapper>
      </View>
    </BottomSheetScrollView>
  );
};
