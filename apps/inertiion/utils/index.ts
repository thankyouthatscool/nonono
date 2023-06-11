import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@nonono/inertiion-backend";

export const trpc = createTRPCReact<AppRouter>();
