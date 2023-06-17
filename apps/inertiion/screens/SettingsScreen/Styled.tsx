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

export const ItemWrapper: FC<
  PropsWithChildren<{ isFirst?: boolean; isLast?: boolean }>
> = ({ children, isFirst, isLast }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: isFirst ? 0 : DEFAULT_APP_PADDING / 2,
        marginBottom: isLast ? 0 : DEFAULT_APP_PADDING / 2,
      }}
    >
      {children}
    </View>
  );
};
