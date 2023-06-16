import BottomSheet from "@gorhom/bottom-sheet";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useMemo, useRef } from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";

import { NewCatalogItemForm } from "@components/NewCatalogItemForm";
import { useAppDispatch, useAppSelector } from "@hooks";
import { HomeScreenRoot } from "@screens/HomeScreen";
import { SettingsScreen } from "@screens/SettingsScreen";
import { setBottomSheetContent } from "@store";
import { RootDrawerNavigationProps } from "@types";

const RootDrawer = createDrawerNavigator<RootDrawerNavigationProps>();

const { height: screenHeight } = Dimensions.get("window");

export const AppRoot = () => {
  const dispatch = useAppDispatch();

  const { bottomSheetContent } = useAppSelector(({ app }) => ({ ...app }));

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => [screenHeight], []);

  useEffect(() => {
    if (bottomSheetContent === "newCatalogItem") {
      bottomSheetRef.current?.snapToIndex(0);
    } else if (bottomSheetContent === "newNote") {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [bottomSheetContent]);

  return (
    <View style={{ flex: 1 }}>
      <RootDrawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootDrawer.Screen component={HomeScreenRoot} name="HomeRoot" />
        <RootDrawer.Screen component={SettingsScreen} name="Settings" />
      </RootDrawer.Navigator>
      <BottomSheet
        enablePanDownToClose
        index={-1}
        onChange={(e) => {
          if (e === -1) {
            dispatch(setBottomSheetContent(null));
          }
        }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
          }}
        >
          {bottomSheetContent === "newCatalogItem" ? (
            <NewCatalogItemForm />
          ) : (
            <Text>{bottomSheetContent}</Text>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};
