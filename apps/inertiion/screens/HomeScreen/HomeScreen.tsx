import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, IconButton, Menu, Searchbar } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setBottomSheetContent, setSearchTerm } from "@store";
import { DEFAULT_APP_PADDING } from "@theme";

import { Header } from "./Styled";

export const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const { searchTerm } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState<boolean>(false);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Header>
        <Searchbar
          elevation={2}
          onClearIconPress={() => {
            dispatch(setSearchTerm(""));
          }}
          onEndEditing={() => {}}
          onChangeText={(newSearchTerm) => {
            dispatch(setSearchTerm(newSearchTerm));
          }}
          placeholder="Search Catalog"
          style={{ flex: 1, margin: DEFAULT_APP_PADDING }}
          value={searchTerm}
        />
        <Menu
          anchor={
            <IconButton
              icon="dots-vertical"
              mode="contained-tonal"
              onPress={() => {
                setIsHeaderMenuOpen(() => true);
              }}
            />
          }
          onDismiss={() => {
            setIsHeaderMenuOpen(() => false);
          }}
          visible={isHeaderMenuOpen}
        >
          <Menu.Item
            onPress={() => {
              setIsHeaderMenuOpen(() => false);

              dispatch(setBottomSheetContent("newCatalogItem"));
            }}
            title="New Catalog Item"
          />
          <Menu.Item
            onPress={() => {
              setIsHeaderMenuOpen(() => false);

              dispatch(setBottomSheetContent("newNote"));
            }}
            title="New Note"
          />
          <Divider />
        </Menu>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  );
};
