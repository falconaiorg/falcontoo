import { z } from "zod";
import { authenticatedProcedure, router } from "../../trpc";

export const sessionsRouter = router({
  getSessions: authenticatedProcedure
    .input(
      z.object({
        dog: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      input.dog;
      console.log(userId);
      return input;
    }),
});
