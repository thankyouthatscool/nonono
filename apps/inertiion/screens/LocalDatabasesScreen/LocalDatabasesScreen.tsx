import { FC, useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { LocalDatabasesScreenProps } from "@types";

import { HeaderWrapper } from "./Styled";
import { DEFAULT_APP_PADDING } from "@theme";

export const LocalDatabasesScreen: FC<LocalDatabasesScreenProps> = ({
  navigation,
}) => {
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
    <SafeAreaView style={{ height: "100%" }}>
      <HeaderWrapper>
        <IconButton
          icon="chevron-left"
          mode="contained"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text variant="titleLarge">Local Databases</Text>
      </HeaderWrapper>
      <ScrollView>
        {localDatabases.map((db, idx) => (
          <DbCard dbName={db} isFirst={idx === 0} key={db} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export const DbCard: FC<{
  dbName: string;
  isFirst?: boolean;
  isLast?: boolean;
}> = ({ dbName, isFirst }) => {
  const [isLoadDone, setIsLoadDone] = useState<boolean>(false);
  const [tableData, setTableData] = useState({ rowsNum: undefined });

  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const handleFetchTableData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(`SELECT COUNT(1) FROM ${dbName}`, [], (_, { rows }) => {
          setTableData(() => ({ rowsNum: rows._array[0]["COUNT(1)"] }));
        });
      },
      (err) => console.log(err)
    );

    setIsLoadDone(() => true);
  }, []);

  useEffect(() => {
    setIsLoadDone(() => false);

    handleFetchTableData();
  }, []);

  return (
    <Card
      style={{
        margin: DEFAULT_APP_PADDING,
        marginBottom: isFirst ? 0 : DEFAULT_APP_PADDING,
      }}
    >
      <Card.Content>
        <Text variant="titleMedium">{dbName}</Text>
        {!!isLoadDone && (
          <View>
            <Text>Number of Records: {tableData.rowsNum}</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
