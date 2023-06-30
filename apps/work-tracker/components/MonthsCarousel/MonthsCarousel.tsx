import { FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSelectedDate, setTouchedDate } from "@store";
import { getMonthInformation, getMonthName, getWeekdayName } from "@utils";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const PADDING = 8;

export const MonthsCarousel: FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch();

  const {
    currentDateInformation: {
      CURRENT_DATE,
      CURRENT_MONTH,
      CURRENT_YEAR,
      CURRENT_WEEK_DAY,
    },
    isLoading,
    selectedDate: { SELECTED_DATE, SELECTED_MONTH, SELECTED_YEAR },
    touchedDate,
  } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const handleSelectedDate = useCallback(
    (dir: "plus" | "minus" | "today") => {
      if (dir === "minus") {
        const DATE_STRING = `${SELECTED_YEAR}-${SELECTED_MONTH}-${SELECTED_DATE}`;

        const CURRENT_SELECTED_DATE = new Date(Date.parse(DATE_STRING));

        const newSelectedDate = new Date(
          CURRENT_SELECTED_DATE.setMonth(CURRENT_SELECTED_DATE.getMonth())
        );

        const NEW_SELECTED_DATE = newSelectedDate.getDate();
        const NEW_SELECTED_MONTH = newSelectedDate.getMonth();
        const NEW_SELECTED_YEAR = newSelectedDate.getFullYear();

        return dispatch(
          setSelectedDate({
            SELECTED_DATE: NEW_SELECTED_DATE,
            SELECTED_MONTH: NEW_SELECTED_MONTH,
            SELECTED_YEAR: NEW_SELECTED_YEAR,
          })
        );
      }

      if (dir === "plus") {
        const DATE_STRING = `${SELECTED_YEAR}-${SELECTED_MONTH}-${SELECTED_DATE}`;

        const CURRENT_SELECTED_DATE = new Date(Date.parse(DATE_STRING));

        const newSelectedDate = new Date(
          CURRENT_SELECTED_DATE.setMonth(CURRENT_SELECTED_DATE.getMonth() + 2)
        );

        const NEW_SELECTED_DATE = newSelectedDate.getDate();
        const NEW_SELECTED_MONTH = newSelectedDate.getMonth();
        const NEW_SELECTED_YEAR = newSelectedDate.getFullYear();

        return dispatch(
          setSelectedDate({
            SELECTED_DATE: NEW_SELECTED_DATE,
            SELECTED_MONTH: NEW_SELECTED_MONTH,
            SELECTED_YEAR: NEW_SELECTED_YEAR,
          })
        );
      }

      return dispatch(
        setSelectedDate({
          SELECTED_DATE: CURRENT_DATE,
          SELECTED_MONTH: CURRENT_MONTH,
          SELECTED_YEAR: CURRENT_YEAR,
        })
      );
    },
    [
      CURRENT_DATE,
      CURRENT_MONTH,
      CURRENT_YEAR,
      SELECTED_DATE,
      SELECTED_MONTH,
      SELECTED_YEAR,
    ]
  );

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", padding: 8 }}>
      {!!isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View>
            <Text>
              {getWeekdayName(CURRENT_WEEK_DAY)}, {CURRENT_DATE}{" "}
              {getMonthName(CURRENT_MONTH)} - {CURRENT_YEAR}
            </Text>
            <Text>
              {getMonthName(SELECTED_MONTH)} - {SELECTED_YEAR}
            </Text>
            <Text variant="titleLarge">Selected Month Information</Text>
            <Text>
              Number of days:{" "}
              {getMonthInformation(SELECTED_YEAR, SELECTED_MONTH).numberOfDays}
            </Text>
            <Text>
              First day:{" "}
              {getMonthInformation(SELECTED_YEAR, SELECTED_MONTH).firstDay}
            </Text>
            <Text>
              Last day:{" "}
              {getMonthInformation(SELECTED_YEAR, SELECTED_MONTH).lastDay}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: WINDOW_WIDTH - PADDING * 2,
            }}
          >
            {Array.from({
              length:
                getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                  .numberOfDays +
                getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                  .firstDayIndex +
                6 -
                getMonthInformation(SELECTED_YEAR, SELECTED_MONTH).lastDayIndex,
            })
              .map((_, idx) => idx)
              .map((idx) => (
                <Pressable
                  key={idx}
                  onPress={() => {
                    if (
                      idx -
                        getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                          .firstDayIndex >=
                        0 &&
                      idx -
                        getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                          .firstDayIndex <
                        getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                          .numberOfDays
                    ) {
                      const NEW_SELECTED_DATE =
                        idx +
                        1 -
                        getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                          .firstDayIndex;

                      dispatch(
                        setTouchedDate({
                          SELECTED_DATE: NEW_SELECTED_DATE,
                          SELECTED_MONTH,
                          SELECTED_YEAR,
                        })
                      );
                    }
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor:
                        `${
                          idx +
                          1 -
                          getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                            .firstDayIndex
                        }-${SELECTED_MONTH}-${SELECTED_YEAR}` ===
                        `${touchedDate?.SELECTED_DATE}-${touchedDate?.SELECTED_MONTH}-${touchedDate?.SELECTED_YEAR}`
                          ? "green"
                          : "white",
                      borderColor:
                        idx <
                        getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                          .firstDayIndex
                          ? "rgba(1, 1, 1, 0.1)"
                          : idx -
                              getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                                .firstDayIndex >=
                            getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                              .numberOfDays
                          ? "rgba(1, 1, 1, 0.1)"
                          : "black",
                      borderRadius: 50,
                      borderWidth: 1,
                      height: (WINDOW_WIDTH - PADDING * 2) / 7,
                      justifyContent: "center",
                      width: (WINDOW_WIDTH - PADDING * 2) / 7,
                    }}
                  >
                    <Text>
                      {idx <
                        getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                          .firstDayIndex ||
                      idx -
                        getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                          .firstDayIndex >=
                        getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                          .numberOfDays
                        ? ""
                        : `${
                            idx +
                            1 -
                            getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
                              .firstDayIndex
                          }`}
                    </Text>
                  </View>
                </Pressable>
              ))}
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <IconButton
              icon="chevron-left"
              mode="contained"
              onPress={() => handleSelectedDate("minus")}
            />
            <IconButton
              disabled={
                `${CURRENT_MONTH}-${CURRENT_YEAR}` ===
                `${SELECTED_MONTH}-${SELECTED_YEAR}`
              }
              icon="calendar"
              mode="contained"
              onPress={() => {
                handleSelectedDate("today");
              }}
            />
            <IconButton
              icon="chevron-right"
              mode="contained"
              onPress={() => {
                handleSelectedDate("plus");
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
