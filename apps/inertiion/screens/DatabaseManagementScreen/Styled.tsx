import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

import { DEFAULT_APP_PADDING } from "@theme";

export const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        padding: DEFAULT_APP_PADDING,
      }}
    >
      {children}
    </View>
  );
};
