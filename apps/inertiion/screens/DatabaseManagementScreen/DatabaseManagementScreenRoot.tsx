import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import {
  Button,
  Card,
  Divider,
  IconButton,
  Snackbar,
  Text,
} from "react-native-paper";

import { useAppSelector } from "@hooks";
import { setCurrentScreen } from "@store";
import { DEFAULT_APP_PADDING } from "@theme";
import type {
  DatabaseManagementScreenRootProps,
  DatabaseManagementScreenStackProps,
} from "@types";
import { trpc } from "@utils";

const DatabaseManagementScreenStack =
  createNativeStackNavigator<DatabaseManagementScreenStackProps>();

export const DatabaseManagementScreen = () => {
  return (
    <DatabaseManagementScreenStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <DatabaseManagementScreenStack.Screen
        component={DatabaseManagementScreenRoot}
        name="DatabaseManagementScreenRoot"
      />
      <DatabaseManagementScreenStack.Screen
        component={LocalDatabasesScreen}
        name="LocalDatabasesScreen"
      />
    </DatabaseManagementScreenStack.Navigator>
  );
};

export const LocalDatabasesScreen = () => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [localDatabases, setLocalDatabases] = useState<string[]>([]);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'android_%'",
          [],
          (_, { rows: { _array } }) => {
            console.log(_array.map((table) => table.name));
            setLocalDatabases(() => _array.map((table) => table.name));
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <View>
      <Text>Local Databases</Text>
      {localDatabases.map((table) => (
        <Text key={table}>{table}</Text>
      ))}
    </View>
  );
};

export const DatabaseManagementScreenRoot: FC<
  DatabaseManagementScreenRootProps
> = ({ navigation }) => {
  const { refetch } = trpc.test.useQuery(undefined, { enabled: false });

  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
  const [snackbarContent, setSnackbarContent] = useState<string>("");

  return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        <Card style={{ margin: DEFAULT_APP_PADDING, marginBottom: 0 }}>
          <Card.Content
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Test Connection</Text>
            <IconButton
              icon="connection"
              mode="contained"
              onPress={async () => {
                const { data } = await refetch();

                if (data === "OK") {
                  setSnackbarContent(() => "Connection OK");
                  setIsSnackbarVisible(() => true);
                } else {
                  setSnackbarContent(() => "No Connection");
                  setIsSnackbarVisible(() => true);
                }
              }}
            />
          </Card.Content>
        </Card>
        <Card style={{ margin: DEFAULT_APP_PADDING }}>
          <Card.Content>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text variant="titleLarge">Databases</Text>
              <IconButton
                icon="chevron-right"
                mode="contained"
                onPress={() => navigation.navigate("LocalDatabasesScreen")}
              />
            </View>
            <View>
              <Text>Delete Local Databases</Text>
            </View>
            <Divider />
            <View>
              <Text>Seed Local Databases</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      <Snackbar
        action={{
          label: "OK",
          onPress: () => setIsSnackbarVisible(() => false),
        }}
        onDismiss={() => {}}
        visible={isSnackbarVisible}
      >
        {snackbarContent}
      </Snackbar>
    </View>
  );
};
