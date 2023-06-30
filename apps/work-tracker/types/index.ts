export type CurrentDateInformation = {
  CURRENT_YEAR: number;
  CURRENT_MONTH: number;
  CURRENT_DATE: number;
  CURRENT_WEEK_DAY: number;
  CURRENT_MONTH_NUMBER_OF_DAYS: number;
  CURRENT_MONTH_FIRST_DAY: number;
  CURRENT_MONTH_LAST_DAY: number;
};

export type AppState = {
  currentDateInformation: CurrentDateInformation;
  isLoading: boolean;
  selectedDate: {
    date: number;
    month: number;
    year: number;
  };
};
