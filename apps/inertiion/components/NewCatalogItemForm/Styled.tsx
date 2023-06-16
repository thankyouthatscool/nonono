import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

import { DEFAULT_APP_PADDING } from "@theme";

export const BottomButterWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: DEFAULT_APP_PADDING,
      }}
    >
      {children}
    </View>
  );
};
