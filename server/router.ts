import { router } from "./trpc";
import { sessionsRouter } from "./routers/sessions/router";

export const appRouter = router({
  sessions: sessionsRouter,
});

export type AppRouter = typeof appRouter;
