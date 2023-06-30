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
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { LocalDatabasesScreen } from "@screens/LocalDatabasesScreen";
import { DEFAULT_APP_PADDING } from "@theme";
import type {
  DatabaseManagementScreenRootProps,
  DatabaseManagementScreenStackProps,
} from "@types";
import { trpc } from "@utils";

import { HeaderWrapper } from "./Styled";

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

export const DatabaseManagementScreenRoot: FC<
  DatabaseManagementScreenRootProps
> = ({ navigation }) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const { refetch: refetchTest } = trpc.test.useQuery(undefined, {
    enabled: false,
  });
  const { refetch: getCatalogDataRefetch } = trpc.getCatalogData.useQuery(
    undefined,
    { enabled: false }
  );

  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
  const [snackbarContent, setSnackbarContent] = useState<string>("");

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <HeaderWrapper>
        <IconButton
          icon="chevron-left"
          mode="contained"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text variant="titleLarge">Database Management</Text>
      </HeaderWrapper>
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
                const { data } = await refetchTest();

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
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Delete Local Databases</Text>
              <IconButton icon="delete" iconColor="red" mode="contained" />
            </View>
            <Divider />
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Seed Local Databases</Text>
              <IconButton
                icon="seed"
                iconColor="green"
                mode="contained"
                onPress={async () => {
                  const { data } = await getCatalogDataRefetch();

                  const testData = data;

                  console.log(testData);
                  console.log("+++");

                  const seedArray = testData
                    ?.map(
                      ({
                        itemId,
                        code,
                        color,
                        size,
                        description,
                        location,
                        dateCreated,
                        dateModified,
                      }) => [
                        itemId,
                        code,
                        color,
                        size,
                        description,
                        location,
                        dateCreated,
                        dateModified,
                      ]
                    )
                    .reduce((acc, val) => [...acc, ...val], [] as string[]);

                  console.log(seedArray);

                  db.transaction(
                    (tx) => {
                      tx.executeSql("DELETE FROM catalogItems");

                      tx.executeSql(
                        `
                        INSERT INTO catalogItems (itemId, code, color, size, description, location, dateCreated, dateModified)
                        VALUES ${testData?.map(
                          (_, idx) => `(?, ?, ?, ?, ?, ?, ?, ?)`
                        )}`,
                        seedArray,
                        (_, { rows }) => {
                          console.log(rows);
                        }
                      );
                    },
                    (err) => console.log(err)
                  );

                  // db.transaction(
                  //   (tx) => {
                  //     tx.executeSql(
                  //       `
                  //     INSERT INTO catalogItems (itemId, code, color, size, description, location, dateCreated, dateModified)
                  //     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                  //       [
                  //         itemId,
                  //         code,
                  //         color,
                  //         size,
                  //         description,
                  //         location,
                  //         dateCreated,
                  //         dateModified,
                  //       ],
                  //       (_, { rows: { _array } }) => {
                  //         console.log(_array);
                  //       }
                  //     );
                  //   },
                  //   (err) => console.log(err)
                  // );
                }}
              />
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
    </SafeAreaView>
  );
};
