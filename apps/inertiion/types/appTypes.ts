import * as SQLite from "expo-sqlite";

export type BottomSheetContent = "newCatalogItem" | "newNote" | null;

export type AppState = {
  bottomSheetContent: BottomSheetContent;
  databaseInstance: SQLite.WebSQLDatabase;
  searchResultCatalog: string[];
  searchResultStorage: string[];
  searchTerm: string;
};
