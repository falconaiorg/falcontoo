"use server";
import to from "await-to-js";
import { ArticleWithContent } from "../../server/next/article";
import { saveAsVector } from "../rag/save";
import { generateArticleContext } from "./generate-context";
import { getExistingArticleContext } from "./get-existing-context";
import prisma from "@falcon/prisma";
import { TRPCError } from "@trpc/server";

export const getArticleContext = async ({
  article,
}: {
  article: ArticleWithContent;
}): Promise<string> => {
  // Add a synthetic delay
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const articleId = article.id;

  // Check if the context is already generated, if so, return it
  const { existingContext, isStale } = await getExistingArticleContext({
    articleId,
  });
  // Check if the context is stale, if not return it, else regenerate it
  if (existingContext && existingContext.length > 0 && !isStale) {
    return existingContext;
  }

  const isEmbedded = article.content.isEmbedded;

  if (!isEmbedded) {
    const [err] = await to(saveAsVector({ article }));
    if (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error saving article as vector. Try again.",
        cause: err,
      });
    }
  }

  const generatedContext = await generateArticleContext({
    article,
  });

  await prisma.articleContext.upsert({
    where: {
      articleId,
    },
    update: {
      markdown: generatedContext,
      isStale: false,
    },
    create: {
      articleId,
      markdown: generatedContext,
      isStale: false,
    },
  });

  await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      content: {
        update: {
          isEmbedded: true,
        },
      },
    },
  });

  return generatedContext;
};
