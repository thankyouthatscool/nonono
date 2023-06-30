import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { getMonthName, getWeekdayName } from "@utils";

export const MonthsCarousel: FC<PropsWithChildren> = () => {
  const {
    currentDateInformation: {
      CURRENT_DATE,
      CURRENT_MONTH,
      CURRENT_YEAR,
      CURRENT_WEEK_DAY,
    },
    isLoading,
  } = useAppSelector(({ app }) => ({
    ...app,
  }));

  return (
    <SafeAreaView>
      {!!isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>
            {getWeekdayName(CURRENT_WEEK_DAY)}, {CURRENT_DATE}{" "}
            {getMonthName(CURRENT_MONTH)} - {CURRENT_YEAR}
          </Text>
        </View>
      )}
      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={() => {
            console.log("selected month minus one");
          }}
          title="Prev"
        />
        <Button
          onPress={() => {
            console.log("Selected month plus one");
          }}
          title="Next"
        />
      </View>
    </SafeAreaView>
  );
};
