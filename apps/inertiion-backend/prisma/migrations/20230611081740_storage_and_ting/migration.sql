-- CreateTable
CREATE TABLE "Storage" (
    "storageId" TEXT NOT NULL,
    "storageLocation" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "cartons" INTEGER NOT NULL,
    "pieces" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("storageId")
);

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "CatalogItem"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;
