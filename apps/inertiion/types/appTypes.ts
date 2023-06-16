export type BottomSheetContent = "newCatalogItem" | "newNote" | null;

export type AppState = {
  bottomSheetContent: BottomSheetContent;
  searchResultCatalog: string[];
  searchResultStorage: string[];
  searchTerm: string;
};
