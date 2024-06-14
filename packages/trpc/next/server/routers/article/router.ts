import prisma from "@falcon/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { checkArticleOwnership } from "@falcon/lib/ai/auth";
import { saveAsVector } from "@falcon/lib/ai/rag/save";
import { ZAddOrUpdateArticle, ZDoesArticleExist } from "./schema";
import { parseUrl } from "@falcon/lib/parser/url";
import { parseArticle } from "@falcon/lib/parser";
import to from "await-to-js";
import { server } from "@falcon/lib/server/next";
import { saveArticle } from "@falcon/lib/server/next/article/save-article";
import { authenticatedProcedure, router, t } from "../../trpc";
import { revalidatePath, revalidateTag } from "next/cache";
import { dracoAxios, getHeaders } from "@falcon/lib/axios-next";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import { ArticleContent } from "@falcon/lib/parser/types";

const ArticleIdSchema = z.object({
  articleId: z.string(),
});
const EmbedArticleMutationSchema = ArticleIdSchema;

const ownershipMiddleware = t.middleware(async ({ ctx, next, input }) => {
  const { articleId } = input as z.infer<typeof ArticleIdSchema>;
  const { article } = await checkArticleOwnership({ articleId });
  return await next({
    ctx: {
      ...ctx,
      article,
    },
  });
});

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

  doesArticleExist: authenticatedProcedure
    .input(ZDoesArticleExist)
    .query(async ({ input, ctx }) => {
      console.log("Checking if article exists", input.url);
      if (!input.url) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "URL is required",
        });
      }
      console.log("Checking if article exists", input.url);

      const parsedUrl = await parseUrl({ url: input.url });

      // Find the Article record by URL and userId
      const userArticle = await prisma.article.findFirst({
        where: {
          userId: ctx.user.id,
          content: {
            url: parsedUrl.href,
          },
        },
        include: {
          content: true,
        },
      });

      if (!userArticle) {
        return false;
      }

      return userArticle;
    }),
  createArticle: authenticatedProcedure
    .input(ZAddOrUpdateArticle)
    .mutation(async ({ ctx, input }) => {
      if (!input.url) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "URL is required",
        });
      }
      const userId = ctx.user.id;
      console.log("Creating article", input.url);
      const parsedUrl = await parseUrl({ url: input.url });
      console.log("Parsed URL", parsedUrl);

      const ParserBodySchema = z.object({
        url: z.string(),
      });
      console.log("Parsed URL", parsedUrl);
      console.log(input.url);
      const nextAuthHeaders = getHeaders();
      const response = await dracoAxios({
        method: "post",
        url: "/parser",
        data: {
          url: input.url,
        },
        headers: nextAuthHeaders,
      });
      const article = response.data as ArticleContent;
      console.log("Parsed article", article);
      const savedArticle = await saveArticle({ articleData: article, userId });
      console.log("Saved article", savedArticle);
      const [err] = await to(saveAsVector({ article: savedArticle }));
      if (err) {
        server.article.deleteArticleForUser({ articleId: savedArticle.id });
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error saving article. Try again.",
          cause: err,
        });
      }
      revalidatePath("/");
      revalidateTag("articles");
      return savedArticle;
    }),

  setReadingProgress: authenticatedProcedure
    .input(
      z.object({ articleId: z.string(), progress: z.number().min(0).max(100) })
    )
    .mutation(async ({ input }) => {
      const { articleId, progress } = input;
      const [err] = await to(
        prisma.article.update({
          where: {
            id: articleId,
          },
          data: {
            readingProgress: progress,
          },
        })
      );
      if (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to set reading progress",
          cause: err,
        });
      }
      return true;
    }),

  snoozeArticle: authenticatedProcedure
    .input(
      z.object({
        articleId: z.string(),
        snoozeDate: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      const { articleId, snoozeDate } = input;
      const [err, article] = await to(
        server.article.snoozeArticle({
          articleId,
          snoozeDate,
        })
      );
      if (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to snooze article",
          cause: err,
        });
      }
      return article;
    }),
});
