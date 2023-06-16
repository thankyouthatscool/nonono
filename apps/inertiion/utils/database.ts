// itemId: string;
// code: string;
// color: string | null;
// size: string | null;
// description: string | null;
// location: string;
// dateCreated: Date;
// dateModified: Date;

export const sqlStatementCreateCatalogItemsTable =
  "CREATE TABLE IF NOT EXISTS catalogItems (itemId TEXT UNIQUE NOT NULL PRIMARY KEY, code TEXT NOT NUL, color TEXT, size TEXT, description TEXT, location STRING, dateCreated TEXT, dateModified TEXT) ";
