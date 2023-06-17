// import Checkbox from "expo-checkbox";
import { FC, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, Checkbox, IconButton, Menu, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { resetAppSettings, setAppSettings } from "@store";
import { DEFAULT_APP_PADDING } from "@theme";
import { AppSettingsKeys, SettingsScreenNavigationProps } from "@types";

import { HeaderWrapper, ItemWrapper } from "./Styled";

// TODO: Native Stack Here

export const SettingsScreen: FC<SettingsScreenNavigationProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { appSettings } = useAppSelector(({ app }) => ({ ...app }));

  return (
    <SafeAreaView>
      <ScrollView>
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
                dispatch(resetAppSettings());

                setIsMenuOpen(() => false);
              }}
              title="Reset Defaults"
            />
          </Menu>
        </HeaderWrapper>
        <Card
          style={{
            margin: DEFAULT_APP_PADDING,
            marginTop: DEFAULT_APP_PADDING / 2,
            marginBottom: DEFAULT_APP_PADDING / 2,
          }}
        >
          <Card.Content>
            <ItemWrapper isFirst>
              <Text>Database Management</Text>
              <IconButton
                icon="chevron-right"
                mode="contained"
                onPress={() => {}}
              />
            </ItemWrapper>
            <ItemWrapper isLast>
              <Text>Live Database Edit</Text>
              <Checkbox
                onPress={() => {
                  dispatch(
                    setAppSettings({
                      key: AppSettingsKeys.IS_DATABASE_LIVE_EDIT_ENABLED,
                      data: !appSettings.isDatabaseLiveEditEnabled,
                    })
                  );
                }}
                status={
                  !!appSettings.isDatabaseLiveEditEnabled
                    ? "checked"
                    : "unchecked"
                }
              />
            </ItemWrapper>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
