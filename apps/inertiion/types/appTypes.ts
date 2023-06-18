import * as SQLite from "expo-sqlite";

export type AppSettings = {
  isDatabaseLiveEditEnabled: boolean;
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  isDatabaseLiveEditEnabled: false,
};

export type BottomSheetContent = "newCatalogItem" | "newNote" | null;

export type AppState = {
  appSettings: AppSettings;

  bottomSheetContent: BottomSheetContent;

  currentScreen: string | undefined;

  databaseInstance: SQLite.WebSQLDatabase;

  searchResultCatalog: string[];
  searchResultStorage: string[];
  searchTerm: string;
};

// Defaults
export enum AppSettingsKeys {
  IS_DATABASE_LIVE_EDIT_ENABLED = "isDatabaseLiveEditEnabled",
}
