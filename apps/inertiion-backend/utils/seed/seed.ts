import { PrismaClient } from "@prisma/client";
import type { CatalogItem, Storage } from "@prisma/client";

import { catalogDataArray } from "./catalogData";
import { storageDataArray } from "./storageData";

const prisma = new PrismaClient();

const catalogData: Omit<CatalogItem, "dateCreated" | "dateModified">[] =
  catalogDataArray
    .map((item) => ({
      itemId: item[0],
      code: item[1],
      color: item[2],
      size: item[3],
      description: item[4],
      location: item[5],
    }))
    .map((item) => ({
      ...item,
      code: item.code.toUpperCase(),
      color: item.color.toUpperCase(),
      size: item.size?.toUpperCase() || null,
      location: item.location.toUpperCase(),
    }));

const storageData: Omit<Storage, "dateCreated" | "dateModified">[] =
  storageDataArray.map((item) => ({
    storageId: item[0],
    storageLocation: item[1],
    itemId: item[2],
    cartons: item[3],
    pieces: item[4],
  }));

(async () => {
  await prisma.storage.deleteMany();
  await prisma.catalogItem.deleteMany();

  await prisma.catalogItem.createMany({ data: catalogData });
  await prisma.storage.createMany({ data: storageData });
})();
