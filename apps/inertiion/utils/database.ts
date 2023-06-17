export const sqlStatementCreateCatalogItemsTable =
  "CREATE TABLE IF NOT EXISTS catalogItems (itemId TEXT UNIQUE NOT NULL PRIMARY KEY, code TEXT NOT NULL, color TEXT, size TEXT, description TEXT, location STRING, dateCreated TEXT NOT NULL, dateModified TEXT NOT NULL) ";

export const sqlStatementCreateStorageTable =
  "CREATE TABLE IF NOT EXISTS storage (storageId TEXT UNIQUE NOT NULL PRIMARY KEY, storageLocation TEXT NOT NULL, itemId STRING NOT NULL, cartons INTEGER, pieces INTEGER, dateCreated TEXT NOT NULL, dateModified TEXT NOT NULL, FOREIGN KEY (itemId) REFERENCES catalogItems (itemId))";
