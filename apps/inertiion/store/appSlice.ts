import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";

import {
  AppSettingsKeys,
  AppState,
  BottomSheetContent,
  DEFAULT_APP_SETTINGS,
} from "@types";
import {
  getAppSettings as lsGetAppSettings,
  setAppSettings as lsSetAppSettings,
  resetAppSettings as lsResetAppSettings,
} from "@utils";

const initialState: AppState = {
  appSettings: DEFAULT_APP_SETTINGS,
  bottomSheetContent: null,
  databaseInstance: SQLite.openDatabase("inertiion.db"),
  searchResultCatalog: [],
  searchResultStorage: [],
  searchTerm: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Bottom Sheet Content
    setBottomSheetContent: (
      state,
      { payload }: PayloadAction<BottomSheetContent>
    ) => {
      state.bottomSheetContent = payload;
    },

    // Search Results
    setSearchResultCatalog: () => {},
    setSearchResultStorage: () => {},

    // Search Term
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
  },
  extraReducers: (builder) => {
    // App Settings
    builder.addCase(setAppSettings.fulfilled, (state, { payload }) => {
      state.appSettings = { ...state.appSettings, [payload.key]: payload.data };
    });
    builder.addCase(getAppSettings.fulfilled, (state, { payload }) => {
      state.appSettings = payload;
    });
    builder.addCase(resetAppSettings.fulfilled, (state) => {
      state.appSettings = DEFAULT_APP_SETTINGS;
    });
  },
});

export const setAppSettings = createAsyncThunk(
  "appSettings/setAppSettings",
  async (settingData: { key: AppSettingsKeys; data: any }) => {
    await lsSetAppSettings(settingData.key, settingData.data);

    return settingData;
  }
);

export const getAppSettings = createAsyncThunk(
  "appSettings/getAppSettings",
  async () => {
    return await lsGetAppSettings();
  }
);

export const resetAppSettings = createAsyncThunk(
  "appSettings/resetAppSettings",
  async () => await lsResetAppSettings()
);

export const {
  // Bottom Sheet Content
  setBottomSheetContent,

  // Search Results
  setSearchResultCatalog,
  setSearchResultStorage,

  // Search Term
  setSearchTerm,
} = appSlice.actions;
