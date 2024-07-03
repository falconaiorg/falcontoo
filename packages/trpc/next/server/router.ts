import { router } from "./trpc";
import { sessionsRouter } from "./routers/sessions/router";
import { articleRouter } from "./routers/article/router";
import { statsRouter } from "./routers/stats/router";

export const appRouter = router({
  sessions: sessionsRouter,
  articles: articleRouter,
  stats: statsRouter,
});

export type AppRouter = typeof appRouter;
