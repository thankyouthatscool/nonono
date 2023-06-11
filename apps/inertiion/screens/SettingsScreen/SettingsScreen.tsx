import { FC } from "react";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { SettingsScreenNavigationProps } from "@types";

export const SettingsScreen: FC<SettingsScreenNavigationProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      <Text>Settings Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate("HomeRoot");
        }}
      >
        Home
      </Button>
    </SafeAreaView>
  );
};
