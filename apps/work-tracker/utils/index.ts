import { DAYS_OF_WEEK, MONTHS } from "@constants";

export const formatDateString = (date: number) => {
  switch (date) {
    default:
      return `${date}th`;
    case 1:
      return `${date}st`;
    case 2:
      return `${date}nd`;
    case 3:
      return `${date}rd`;
  }
};

export const getMonthInformation = (year: number, month: number) => {
  const numberOfDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 0).getDay();
  const lastDay = new Date(year, month, numberOfDays - 1).getDay();

  return {
    fullName: MONTHS[month].fullMonthName,
    shortName: MONTHS[month].shortMonthName,
    numberOfDays,
    firstDay: DAYS_OF_WEEK[firstDay],
    firstDayIndex: firstDay,
    lastDay: DAYS_OF_WEEK[lastDay],
    lastDayIndex: lastDay,
  };
};

export const getMonthName = (monthNumber: number) => {
  return MONTHS[monthNumber].fullMonthName || "";
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
