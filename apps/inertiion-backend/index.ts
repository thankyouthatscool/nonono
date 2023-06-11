import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import bodyParser from "body-parser";
import express from "express";
import multer from "multer";
import { resolve } from "path";

import { appRouter } from "./routers";

export type { AppRouter } from "./routers";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app = express();

const upload = multer({ dest: resolve("./images") });

app.use(bodyParser.json());

app.use("/test", (_, res) => {
  return res.status(200).json({ message: "OK" });
});

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = inferAsyncReturnType<typeof createContext>;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}...`);
});
