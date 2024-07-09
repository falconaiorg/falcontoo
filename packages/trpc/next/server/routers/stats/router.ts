import to from "await-to-js";
import { authenticatedProcedure, router, t } from "../../trpc";
import { z } from "zod";
import prisma from "@falcon/prisma";
import { TRPCError } from "@trpc/server";
import {
  ZUserStatsUpdateSchema,
  updateUserStats,
} from "./update-reading-session";
import { subDays } from "date-fns";

export const statsRouter = router({
  createReadingSession: authenticatedProcedure.mutation(
    async ({ ctx, input }) => {
      //console.log(input);

      const [error, session] = await to(
        prisma.readingSession.create({
          data: {
            userId: ctx.user.id,
          },
        })
      );
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create reading session",
        });
      }
      const readingSessionId = session.id;
      return { readingSessionId };
    }
  ),
  /**
   * Get the reading session history for the last 7 days
   */
  getSessionHistory: authenticatedProcedure.query(async ({ ctx }) => {
    const [error, sessions] = await to(
      prisma.readingSession.findMany({
        where: {
          userId: ctx.user.id,
          createdAt: {
            gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        include: {
          sessionArticles: {
            include: {
              article: {
                include: {
                  content: true,
                },
              },
            },
            take: 5,
          },
        },
      })
    );
    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch reading sessions",
      });
    }
    return sessions;
  }),
  getWeeklyStats: authenticatedProcedure.query(async ({ ctx }) => {
    const sevenDaysAgo = subDays(new Date(), 7);

    const [error, stats] = await to(
      prisma.dailyUserStats.findMany({
        where: {
          userId: ctx.user.id,
          date: {
            gte: sevenDaysAgo,
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    );
    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch weekly stats",
      });
    }
    return stats;
  }),
  getUserStats: authenticatedProcedure.query(async ({ ctx }) => {
    const [error, stats] = await to(
      prisma.userStats.findUnique({
        where: {
          userId: ctx.user.id,
        },
      })
    );
    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user stats",
      });
    }
    return stats;
  }),
  updateReadingSession: authenticatedProcedure
    .input(ZUserStatsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [error] = await to(updateUserStats(input));
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create reading session",
        });
      }
    }),
  resetAllStats: authenticatedProcedure.mutation(async ({ ctx }) => {
    await prisma.$transaction([
      prisma.readingSession.deleteMany({
        where: {
          userId: ctx.user.id,
        },
      }),
      prisma.userStats.delete({
        where: {
          userId: ctx.user.id,
        },
      }),
      prisma.dailyUserStats.deleteMany({
        where: {
          userId: ctx.user.id,
        },
      }),
    ]);
  }),
});
