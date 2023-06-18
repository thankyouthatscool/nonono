import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";

export type RootDrawerNavigationProps = {
  HomeRoot: undefined;
  Settings: undefined;
};

export type HomeTabNavigationProps = {
  Home: undefined;
  Storage: undefined;
  Logs: undefined;
};

export type SettingsScreenNavigationProps =
  DrawerScreenProps<RootDrawerNavigationProps>;

// Settings Screen

export type SettingsScreenStackProps = {
  DatabaseManagementScreen: undefined;
  SettingsScreenRoot: undefined;
};

export type SettingsScreenRootProps = NativeStackScreenProps<
  SettingsScreenStackProps,
  "SettingsScreenRoot"
>;

// Database Settings Screen
export type DatabaseManagementScreenStackProps = {
  DatabaseManagementScreenRoot: undefined;
  LocalDatabasesScreen: undefined;
};

export type DatabaseManagementScreenRootProps = NativeStackScreenProps<
  DatabaseManagementScreenStackProps,
  "DatabaseManagementScreenRoot"
>;
