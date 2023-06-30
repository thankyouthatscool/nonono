import { DAYS_OF_WEEK, MONTHS } from "@constants";

export const getMonthInformation = (year: number, month: number) => {
  const numberOfDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 0).getDay();
  const lastDay = new Date(year, month, numberOfDays - 1).getDay();

  return {
    fullName: MONTHS[month].fullMonthName,
    shortName: MONTHS[month].shortMonthName,
    numberOfDays,
    firstDay: DAYS_OF_WEEK[firstDay],
    lastDay: DAYS_OF_WEEK[lastDay],
  };
};

export const getMonthName = (monthNumber: number) => {
  return { 5: "June", 6: "July" }[monthNumber] || "";
};

export const getWeekdayName = (weekdayNumber: number) => {
  return (
    {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    }[weekdayNumber] || ""
  );
};
