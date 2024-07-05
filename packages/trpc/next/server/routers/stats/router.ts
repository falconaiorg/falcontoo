import to from "await-to-js";
import { authenticatedProcedure, router, t } from "../../trpc";
import { z } from "zod";
import prisma from "@falcon/prisma";
import { TRPCError } from "@trpc/server";
import {
  ZUserStatsUpdateSchema,
  updateUserStats,
} from "./update-reading-session";

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
  getSessionHistory: authenticatedProcedure.query(async ({ ctx }) => {
    const [error, sessions] = await to(
      prisma.readingSession.findMany({
        where: {
          userId: ctx.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
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
    const [error, stats] = await to(
      prisma.dailyUserStats.findMany({
        where: {
          userId: ctx.user.id,
        },
        orderBy: {
          date: "desc",
        },
        take: 7,
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
});
