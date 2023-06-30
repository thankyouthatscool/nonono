import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DAYS_OF_WEEK, MONTHS } from "@constants";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setSelectedMonth } from "@store";
import { getMonthInformation } from "@utils";

export const MonthCard: FC<PropsWithChildren<{ monthIndex: number }>> = ({
  monthIndex,
}) => {
  const dispatch = useAppDispatch();

  const { dateInformation, selectedMonth, selectedYear } = useAppSelector(
    ({ app }) => ({ ...app })
  );

  const [monthInformation, setMonthInformation] = useState<
    | {
        fullName: string;
        shortName: string;
        numberOfDays: number;
        firstDay: string;
        lastDay: string;
      }
    | undefined
  >(undefined);

  const [monthBreakdown, setMonthBreakdown] = useState<string[]>([]);

  useEffect(() => {
    setMonthInformation(() => getMonthInformation(selectedYear, monthIndex));
  }, []);

  useEffect(() => {
    if (!!monthInformation) {
      const firstDayIndex = DAYS_OF_WEEK.indexOf(monthInformation.firstDay);

      const monthBreakDown = Array.from({
        length: monthInformation.numberOfDays,
      })
        .map((_, idx) => idx)
        .map((idx) => {
          const weekRow = Math.floor((idx + firstDayIndex) / 7);
          const dayColumn = (idx + firstDayIndex) % 7;

          return `${weekRow}, ${dayColumn}`;
        });

      setMonthBreakdown(() => monthBreakDown);
    }
  }, [monthInformation]);

  return (
    <SafeAreaView
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color:
            monthIndex === dateInformation.CURRENT_MONTH ? "green" : "black",
          fontWeight:
            monthIndex === dateInformation.CURRENT_MONTH ? "700" : "400",
        }}
      >
        {MONTHS[monthIndex].fullMonthName} - {selectedYear}
      </Text>
      {Array.from({
        length: 6,
      })
        .map((_, idx) => idx)
        .map((weekRowIndex) => (
          <WeekRow
            key={weekRowIndex}
            monthBreakdown={monthBreakdown}
            weekRowIndex={weekRowIndex}
          />
        ))}

      {monthInformation?.firstDay === "Monday" &&
        monthInformation.numberOfDays === 28 && <Text>Four rows only</Text>}
      {dateInformation.CURRENT_MONTH !== monthIndex && (
        <Button
          onPress={() => {
            dispatch(setSelectedMonth(dateInformation.CURRENT_MONTH));
          }}
          title="today"
        />
      )}
    </SafeAreaView>
  );
};

export const WeekRow: FC<
  PropsWithChildren<{ monthBreakdown: string[]; weekRowIndex: number }>
> = ({ monthBreakdown, weekRowIndex }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 30 }}>
      {Array.from({ length: 7 })
        .map((_, idx) => idx)
        .map((dayIndex) => (
          <View
            key={dayIndex}
            style={{
              alignItems: "center",

              borderColor: monthBreakdown.includes(
                `${weekRowIndex}, ${dayIndex}`
              )
                ? "green"
                : "white",
              borderRadius: 50,
              borderWidth: 1,

              height: 40,

              justifyContent: "center",

              marginRight: dayIndex === 6 ? 0 : 10,

              width: 40,
            }}
          >
            <Text>{DAYS_OF_WEEK[dayIndex].slice(0, 1)}</Text>
          </View>
        ))}
    </View>
  );
};
