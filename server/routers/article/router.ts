import prisma from "@/prisma";
import { authenticatedProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const articleRouter = router({
  getArticles: authenticatedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.user.id;
    try {
      const userWithArticles = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          articles: true,
        },
      });
      if (!userWithArticles) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return userWithArticles.articles;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get articles",
      });
    }
  }),
});
