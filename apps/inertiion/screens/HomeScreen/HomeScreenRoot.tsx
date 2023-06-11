import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { LogsScreen } from "@screens/LogsScreen";
import { StorageScreen } from "@screens/StorageScreen";
import { HomeTabNavigationProps } from "@types";

import { HomeScreen } from "./HomeScreen";

const HomeTabNavigator =
  createMaterialBottomTabNavigator<HomeTabNavigationProps>();

export const HomeScreenRoot = () => {
  return (
    <HomeTabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarColor: "yellow" }}
      shifting={true}
    >
      <HomeTabNavigator.Screen
        component={HomeScreen}
        name="Home"
        options={{ tabBarIcon: "home" }}
      />
      <HomeTabNavigator.Screen
        component={StorageScreen}
        name="Storage"
        options={{
          tabBarIcon: "bookshelf",
        }}
      />
      <HomeTabNavigator.Screen
        component={LogsScreen}
        name="Logs"
        options={{ tabBarIcon: "record" }}
      />
    </HomeTabNavigator.Navigator>
  );
};
