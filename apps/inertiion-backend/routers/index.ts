import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

export const prisma = new PrismaClient();

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const test = publicProcedure.query(() => "OK");

const getCatalogData = publicProcedure.query(
  async () => await prisma.catalogItem.findMany()
);

const getStorageData = publicProcedure.query(
  async () => await prisma.storage.findMany()
);

export const appRouter = router({
  test,
  getCatalogData,
  getStorageData,
});

export type AppRouter = typeof appRouter;
