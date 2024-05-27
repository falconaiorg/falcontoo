import prisma from "@/prisma";
import { authenticatedProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "@/server/trpc";
import { checkArticleOwnership } from "@/server/ai/auth";
import { saveAsVector } from "@/server/ai/rag/save";
import { ZAddOrUpdateArticle, ZDoesArticleExist } from "./schema";
import { parseUrl } from "@/server/parser/url";
import { parseArticle } from "@/server/parser";
import to from "await-to-js";
import { server } from "@/server/next";
import { saveArticle } from "@/server/next/article/save-article";

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
      if (!input.url) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "URL is required",
        });
      }

      const parsedUrl = await parseUrl({ url: input.url });

      // Find all ArticleContent records by URL
      const articleContents = await prisma.articleContent.findMany({
        where: {
          url: parsedUrl.href,
        },
        include: {
          articles: true,
        },
      });

      if (articleContents.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Article content not found",
        });
      }

      // Filter articles for the specific user
      const userArticle = articleContents
        .flatMap((content) => content.articles)
        .find((article) => article.userId === ctx.user.id);

      if (!userArticle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Article not found for the user",
        });
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
      const parsedUrl = await parseUrl({ url: input.url });
      const article = await parseArticle({ url: parsedUrl });
      const savedArticle = await saveArticle(article);
      console.log("Saved article", savedArticle);
      // const [err] = await to(saveAsVector({ article: savedArticle }));
      // if (err) {
      //   server.article.deleteArticleForUser({ articleId: savedArticle.id });
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "Error saving article. Try again.",
      //     cause: err,
      //   });
      // }
      return savedArticle;
    }),
});
