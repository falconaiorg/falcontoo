import { authenticatedProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const sessionsRouter = router({
  getSessions: authenticatedProcedure
    .input(
      z.object({
        dog: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      input.dog;
      console.log(userId);
      return input;
    }),
});
