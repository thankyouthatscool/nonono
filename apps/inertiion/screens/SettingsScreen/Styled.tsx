import { FC, PropsWithChildren } from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";

import { DEFAULT_APP_PADDING } from "@theme";

export const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: DEFAULT_APP_PADDING,
      }}
    >
      {children}
    </View>
  );
};

export const SingleToggleSettingWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Card style={{ margin: DEFAULT_APP_PADDING }}>
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {children}
        </View>
      </Card.Content>
    </Card>
  );
};
