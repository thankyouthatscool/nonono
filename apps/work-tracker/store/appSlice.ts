import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  AppState,
  CurrentDateInformation,
  SelectedDate,
  TouchedDate,
} from "@types";

const dateInstance = new Date();

const CURRENT_YEAR = dateInstance.getFullYear();
const CURRENT_MONTH = dateInstance.getMonth();
const CURRENT_DATE = dateInstance.getDate();
const CURRENT_WEEK_DAY = dateInstance.getDay();
const CURRENT_MONTH_NUMBER_OF_DAYS = new Date(
  CURRENT_YEAR,
  CURRENT_MONTH + 1,
  0
).getDate();
const CURRENT_MONTH_FIRST_DAY = new Date(
  CURRENT_YEAR,
  CURRENT_MONTH,
  0
).getDay();
const CURRENT_MONTH_LAST_DAY = new Date(
  CURRENT_YEAR,
  CURRENT_MONTH,
  CURRENT_MONTH_NUMBER_OF_DAYS - 1
).getDay();

const initialState: AppState = {
  currentDateInformation: {
    CURRENT_YEAR,
    CURRENT_MONTH,
    CURRENT_DATE,
    CURRENT_WEEK_DAY,
    CURRENT_MONTH_NUMBER_OF_DAYS,
    CURRENT_MONTH_FIRST_DAY,
    CURRENT_MONTH_LAST_DAY,
  },
  isLoading: true,
  selectedDate: {
    SELECTED_DATE: CURRENT_DATE,
    SELECTED_MONTH: CURRENT_MONTH,
    SELECTED_YEAR: CURRENT_YEAR,
  },
  touchedDate: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentDateInformation: (
      state,
      { payload }: PayloadAction<CurrentDateInformation>
    ) => {
      state.currentDateInformation = payload;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    // Selected date
    setSelectedDate: (state, { payload }: PayloadAction<SelectedDate>) => {
      state.selectedDate = payload;
    },

    // Touched date
    setTouchedDate: (state, { payload }: PayloadAction<TouchedDate>) => {
      state.touchedDate = payload;
    },
  },
});

export const {
  setCurrentDateInformation,
  setIsLoading,
  setSelectedDate,
  setTouchedDate,
} = appSlice.actions;
