import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";

import type { AppState, BottomSheetContent } from "@types";

const initialState: AppState = {
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
});

export const {
  // Bottom Sheet Content
  setBottomSheetContent,

  // Search Results
  setSearchResultCatalog,
  setSearchResultStorage,

  // Search Term
  setSearchTerm,
} = appSlice.actions;
