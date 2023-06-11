import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "@types";

const initialState: AppState = {
  searchResultCatalog: [],
  searchResultStorage: [],
  searchTerm: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
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
  // Search Results
  setSearchResultCatalog,
  setSearchResultStorage,

  // Search Term
  setSearchTerm,
} = appSlice.actions;
