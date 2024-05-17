import { router } from "./trpc";
import { sessionsRouter } from "./routers/sessions/router";
import { articleRouter } from "./routers/article/router";

export const appRouter = router({
  sessions: sessionsRouter,
  articles: articleRouter,
});

export type AppRouter = typeof appRouter;
