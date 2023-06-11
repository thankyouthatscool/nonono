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
