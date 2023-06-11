import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSearchTerm } from "@store";
import { DEFAULT_APP_PADDING } from "@theme";

export const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const { searchTerm } = useAppSelector(({ app }) => ({ ...app }));

  return (
    <SafeAreaView style={{ height: "100%" }}>
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
        style={{ margin: DEFAULT_APP_PADDING }}
        value={searchTerm}
      />
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  );
};
