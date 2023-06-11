import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
  test: publicProcedure
    .input(z.object({ testString: z.string().optional() }))
    .query(() => "OK"),
});

export type AppRouter = typeof appRouter;
