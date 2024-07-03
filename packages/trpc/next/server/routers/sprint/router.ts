import to from "await-to-js";
import { authenticatedProcedure, router, t } from "../../trpc";
import { z } from "zod";
import prisma from "@falcon/prisma";
import { TRPCError } from "@trpc/server";

const ZUpdateSprintArticleStatus = z.object({
  sprintArticleId: z.string(),
  isCompleted: z.boolean(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
});

const ZAddArticleToSprint = z.object({
  sprintId: z.string(),
  articleId: z.string(),
  order: z.number(),
});

const ZUpdateSprintStatus = z.object({
  sprintId: z.string(),
  status: z.enum(["CREATED", "IN_PROGRESS", "COMPLETED", "ABANDONED"]),
});
const ZGetSprintDetails = z.object({
  sprintId: z.string(),
});

const ZDeleteSprint = z.object({
  sprintId: z.string(),
});

const ZCreateSprint = z.object({
  duration: z.number(),
});

const ZCreateSprintWithArticles = z.object({
  durationInMins: z.number().describe("Duration in minutes"),
  articles: z.array(
    z.object({
      articleId: z.string(),
      order: z.number(),
    })
  ),
});

export const sprintRouter = router({
  getSprint: authenticatedProcedure
    .input(ZGetSprintDetails)
    .query(async ({ input }) => {
      const { sprintId } = input;
      const [error, sprint] = await to(
        prisma.sprint.findUnique({
          where: { id: sprintId },
          include: {
            sprintArticles: {
              include: {
                article: {
                  include: {
                    content: true,
                  },
                },
              },
            },
          },
        })
      );
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve sprint details",
        });
      }
      return sprint;
    }),
  createSprintWithArticles: authenticatedProcedure
    .input(ZCreateSprintWithArticles)
    .mutation(async ({ ctx, input }) => {
      const { articles } = input;

      const durationInMilliseconds = input.durationInMins * 60 * 1000;

      // Start a transaction to ensure atomicity
      const [error, sprint] = await to(
        prisma.$transaction(async (tx) => {
          const createdSprint = await tx.sprint.create({
            data: {
              userId: ctx.user.id,
              status: "CREATED",
              duration: durationInMilliseconds,
            },
          });

          const sprintArticles = articles.map((article) => ({
            sprintId: createdSprint.id,
            articleId: article.articleId,
            order: article.order,
          }));

          await tx.sprintArticle.createMany({
            data: sprintArticles,
          });

          return createdSprint;
        })
      );

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create sprint with articles",
        });
      }

      return { sprint };
    }),
  createSprint: authenticatedProcedure
    .input(ZCreateSprint)
    .mutation(async ({ ctx, input }) => {
      const [error, sprint] = await to(
        prisma.sprint.create({
          data: {
            userId: ctx.user.id,
            status: "CREATED",
            duration: input.duration,
          },
        })
      );
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create sprint",
        });
      }
      const sprintId = sprint.id;
      return { sprintId };
    }),
  updateSprintStatus: authenticatedProcedure
    .input(ZUpdateSprintStatus)
    .mutation(async ({ input }) => {
      const { sprintId, status } = input;
      const [error, sprint] = await to(
        prisma.sprint.update({
          where: { id: sprintId },
          data: { status },
        })
      );
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update sprint status",
        });
      }
      return { sprint };
    }),
  addArticleToSprint: authenticatedProcedure
    .input(ZAddArticleToSprint)
    .mutation(async ({ input }) => {
      const { sprintId, articleId, order } = input;
      const [error, sprintArticle] = await to(
        prisma.sprintArticle.create({
          data: {
            sprintId,
            articleId,
            order,
          },
        })
      );
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add article to sprint",
        });
      }
      return { sprintArticle };
    }),
  updateSprintArticleStatus: authenticatedProcedure
    .input(ZUpdateSprintArticleStatus)
    .mutation(async ({ input }) => {
      const { sprintArticleId, isCompleted, startedAt, completedAt } = input;
      const [error, sprintArticle] = await to(
        prisma.sprintArticle.update({
          where: { id: sprintArticleId },
          data: { isCompleted, startedAt, completedAt },
        })
      );
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update sprint article status",
        });
      }
      return { sprintArticle };
    }),
  getUserSprints: authenticatedProcedure.query(async ({ ctx }) => {
    const [error, sprints] = await to(
      prisma.sprint.findMany({
        where: { userId: ctx.user.id },
      })
    );
    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve user sprints",
      });
    }
    return sprints;
  }),
  deleteSprint: authenticatedProcedure
    .input(ZDeleteSprint)
    .mutation(async ({ input }) => {
      const { sprintId } = input;
      const [error] = await to(
        prisma.sprint.delete({
          where: { id: sprintId },
        })
      );
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete sprint",
        });
      }
      return { message: "Sprint deleted successfully" };
    }),
});
