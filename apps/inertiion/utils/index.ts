import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@nonono/inertiion-backend";

export * from "./database";

export * from "./localStorage";

export const trpc = createTRPCReact<AppRouter>();
