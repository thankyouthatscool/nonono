import type { FC, PropsWithChildren } from "react";
import { View } from "react-native";

import { APP_PADDING } from "@theme";

export const RowContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        marginBottom: APP_PADDING,
      }}
    >
      {children}
    </View>
  );
};

export const BottomButtonContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      {children}
    </View>
  );
};
