import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { Button, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { trpc } from "@utils";

export const AppRoot = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, refetch } = trpc.test.useQuery(
    {
      testString: searchTerm,
    },
    { enabled: false }
  );

  useEffect(() => {
    if (!!data)
      console.log("🚀 ~ file: AppRoot.tsx:27 ~ useEffect ~ data:", data);
  }, [data]);

  return (
    <SafeAreaView>
      <View style={{ margin: 8, marginBottom: 0 }}>
        <Searchbar
          elevation={5}
          onChangeText={(newSearchTerm) => {
            setSearchTerm(() => newSearchTerm);
          }}
          onEndEditing={(e) => {
            refetch();
          }}
          placeholder="Search"
          value={searchTerm}
        />
      </View>
    </SafeAreaView>
  );
};
