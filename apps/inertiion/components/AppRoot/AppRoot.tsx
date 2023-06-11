import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeScreenRoot } from "@screens/HomeScreen";
import { SettingsScreen } from "@screens/SettingsScreen";
import { RootDrawerNavigationProps } from "@types";

const RootDrawer = createDrawerNavigator<RootDrawerNavigationProps>();

export const AppRoot = () => {
  return (
    <RootDrawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootDrawer.Screen component={HomeScreenRoot} name="HomeRoot" />
      <RootDrawer.Screen component={SettingsScreen} name="Settings" />
    </RootDrawer.Navigator>
  );
};
