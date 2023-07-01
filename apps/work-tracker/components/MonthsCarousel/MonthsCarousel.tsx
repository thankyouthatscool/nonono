import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { IconButton, Modal, Portal, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { DayModal } from "@components/DayModal";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setSelectedDate, setTouchedDate } from "@store";
import { APP_PADDING } from "@theme";
import {
  formatDateString,
  getMonthInformation,
  getMonthName,
  getWeekdayName,
} from "@utils";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

export const MonthsCarousel: FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch();

  const [selectedMonthInformation, setSelectedMonthInformation] = useState<
    ReturnType<typeof getMonthInformation> | undefined
  >(undefined);

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

  useEffect(() => {
    if (!!SELECTED_MONTH && !!SELECTED_YEAR) {
      console.log(
        `Getting month information for ${SELECTED_MONTH}/${SELECTED_YEAR}...`
      );

      setSelectedMonthInformation(() =>
        getMonthInformation(SELECTED_YEAR, SELECTED_MONTH)
      );
    }
  }, [SELECTED_MONTH, SELECTED_YEAR]);

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", padding: 8 }}>
      {!!isLoading ? (
        <Text>Loading...</Text>
      ) : !!selectedMonthInformation ? (
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <Text variant="titleLarge">
            {getWeekdayName(CURRENT_WEEK_DAY)}, {getMonthName(CURRENT_MONTH)}{" "}
            {formatDateString(CURRENT_DATE)}, {CURRENT_YEAR}
          </Text>
          <View>
            <Text
              style={{ textAlign: "center", paddingBottom: APP_PADDING }}
              variant="titleSmall"
            >
              {getMonthName(SELECTED_MONTH)}/{SELECTED_YEAR}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: WINDOW_WIDTH - APP_PADDING * 2,
              }}
            >
              {Array.from({
                length:
                  selectedMonthInformation.numberOfDays +
                  selectedMonthInformation.firstDayIndex +
                  6 -
                  selectedMonthInformation.lastDayIndex,
              })
                .map((_, idx) => idx)
                .map((idx) => (
                  <Pressable
                    key={idx}
                    onPress={() => {
                      if (
                        idx - selectedMonthInformation.firstDayIndex >= 0 &&
                        idx - selectedMonthInformation.firstDayIndex <
                          selectedMonthInformation.numberOfDays
                      ) {
                        const NEW_SELECTED_DATE =
                          idx + 1 - selectedMonthInformation.firstDayIndex;

                        dispatch(
                          setTouchedDate({
                            SELECTED_DATE: NEW_SELECTED_DATE,
                            SELECTED_MONTH,
                            SELECTED_YEAR,
                          })
                        );
                      }
                    }}
                    onLongPress={() => {
                      dispatch(setTouchedDate(null));

                      console.log(
                        `${
                          idx + 1 - selectedMonthInformation.firstDayIndex
                        }/${SELECTED_MONTH}/${SELECTED_YEAR} - will be okayed`
                      );
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        borderColor:
                          idx < selectedMonthInformation.firstDayIndex
                            ? "rgba(1, 1, 1, 0.1)"
                            : idx - selectedMonthInformation.firstDayIndex >=
                              selectedMonthInformation.numberOfDays
                            ? "rgba(1, 1, 1, 0.1)"
                            : `${
                                idx + 1 - selectedMonthInformation.firstDayIndex
                              }-${SELECTED_MONTH}-${SELECTED_YEAR}` ===
                              `${touchedDate?.SELECTED_DATE}-${touchedDate?.SELECTED_MONTH}-${touchedDate?.SELECTED_YEAR}`
                            ? "green"
                            : "rgba(1, 1, 1, 0.25)",
                        borderRadius: 50,
                        borderWidth: 1,
                        height: (WINDOW_WIDTH - APP_PADDING * 2) / 7,
                        justifyContent: "center",
                        width: (WINDOW_WIDTH - APP_PADDING * 2) / 7,
                      }}
                    >
                      <Text>
                        {idx < selectedMonthInformation.firstDayIndex ||
                        idx - selectedMonthInformation.firstDayIndex >=
                          selectedMonthInformation.numberOfDays
                          ? ""
                          : `${
                              idx + 1 - selectedMonthInformation.firstDayIndex
                            }`}
                      </Text>
                    </View>
                  </Pressable>
                ))}
            </View>
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
          <DayModal />
        </View>
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};
