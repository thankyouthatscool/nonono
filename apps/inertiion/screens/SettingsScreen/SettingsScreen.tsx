import Checkbox from "expo-checkbox";
import { FC, useCallback, useEffect, useState } from "react";
import { IconButton, Menu, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { SettingsScreenNavigationProps } from "@types";
import {
  AppSettings,
  getAppSettings,
  resetAppSettings,
  setAppSettings,
} from "@utils";

import { HeaderWrapper, SingleToggleSettingWrapper } from "./Styled";

export const SettingsScreen: FC<SettingsScreenNavigationProps> = ({
  navigation,
}) => {
  const [appSettings, setAppSettings] = useState<{
    isDatabaseLiveEdits: boolean;
  } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const appSettings = await getAppSettings();

      if (!!appSettings) {
        setAppSettings(() => appSettings);
      }
    })();
  }, []);

  return (
    <SafeAreaView>
      <HeaderWrapper>
        <Text variant="headlineLarge">Settings</Text>
        <Menu
          anchor={
            <IconButton
              icon="dots-vertical"
              onPress={() => setIsMenuOpen(() => true)}
            />
          }
          onDismiss={() => setIsMenuOpen(() => false)}
          visible={isMenuOpen}
        >
          <Menu.Item
            onPress={async () => {
              const appSettings = await resetAppSettings();

              setTimeout(() => {
                setAppSettings(() => null);
              }, 1);

              setAppSettings(() => appSettings);

              setIsMenuOpen(() => false);
            }}
            title="Reset Defaults"
          />
        </Menu>
      </HeaderWrapper>
      <LiveDatabaseEditSetting
        isOptionEnabled={appSettings?.isDatabaseLiveEdits}
      />
    </SafeAreaView>
  );
};

export const LiveDatabaseEditSetting: FC<{
  isOptionEnabled: boolean | undefined;
}> = ({ isOptionEnabled }) => {
  const [isChecked, setIsChecked] = useState<boolean>(!!isOptionEnabled);

  const handleValueChange = useCallback((newValue: boolean) => {
    setIsChecked(() => newValue);

    setAppSettings(AppSettings.IS_DATABASE_LIVE_EDITS, newValue);
  }, []);

  useEffect(() => {
    setIsChecked(() => !!isOptionEnabled);
  }, [isOptionEnabled]);

  useEffect(() => {
    console.log(isOptionEnabled);
  }, [isOptionEnabled]);

  return (
    <SingleToggleSettingWrapper>
      <Text>Live Database Edits</Text>
      <Checkbox onValueChange={handleValueChange} value={isChecked} />
    </SingleToggleSettingWrapper>
  );
};
