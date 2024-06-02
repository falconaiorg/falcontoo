"use server";

import { ArticleWithContent } from "../../server/next/article";
import { generateArticleContext } from "./generate-context";
import { getExistingArticleContext } from "./get-existing-context";
import prisma from "@falcon/prisma";

export const getArticleContext = async ({
  article,
}: {
  article: ArticleWithContent;
}): Promise<string> => {
  const articleId = article.id;

  // Check if the context is already generated, if so, return it
  const { existingContext, isStale } = await getExistingArticleContext({
    articleId,
  });
  // Check if the context is stale, if not return it, else regenerate it
  if (existingContext && existingContext.length > 0 && !isStale) {
    return existingContext;
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
