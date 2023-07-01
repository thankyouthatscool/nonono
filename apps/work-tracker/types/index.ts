export type CurrentDateInformation = {
  CURRENT_YEAR: number;
  CURRENT_MONTH: number;
  CURRENT_DATE: number;
  CURRENT_WEEK_DAY: number;
  CURRENT_MONTH_NUMBER_OF_DAYS: number;
  CURRENT_MONTH_FIRST_DAY: number;
  CURRENT_MONTH_LAST_DAY: number;
};

export type SelectedDate = {
  SELECTED_DATE: number;
  SELECTED_MONTH: number;
  SELECTED_YEAR: number;
};

export type TouchedDate = {
  SELECTED_DATE: number;
  SELECTED_MONTH: number;
  SELECTED_YEAR: number;
} | null;

export type AppState = {
  currentDateInformation: CurrentDateInformation;
  isLoading: boolean;
  selectedDate: SelectedDate;
  touchedDate: TouchedDate;
};

export type DayInformation = {
  hoursWorked: number;
  hourlyRate: number;
  comments: string;
};
