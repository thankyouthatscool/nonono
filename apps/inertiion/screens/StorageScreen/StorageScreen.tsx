import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSearchTerm } from "@store";
import { DEFAULT_APP_PADDING } from "@theme";

export const StorageScreen = () => {
  const dispatch = useAppDispatch();

  const { searchTerm } = useAppSelector(({ app }) => ({ ...app }));

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Searchbar
        elevation={2}
        onChangeText={(newSearchTerm) => {
          dispatch(setSearchTerm(newSearchTerm));
        }}
        onClearIconPress={() => {
          dispatch(setSearchTerm(""));
        }}
        placeholder="Search Storage"
        style={{ margin: DEFAULT_APP_PADDING, marginBottom: 0 }}
        value={searchTerm}
      />
    </SafeAreaView>
  );
};
