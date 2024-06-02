import prisma from "@falcon/prisma";

import { ArticleWithContent } from "./get-article";
import { cache } from "../../cache";

export const getArticlesbyUserId = cache.react(
  async ({ userId }: { userId: string }): Promise<ArticleWithContent[]> => {
    try {
      const userWithArticles = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          articles: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              content: true,
            },
          },
        },
      });
      if (!userWithArticles) {
        throw new Error("User not found");
      }
      return userWithArticles.articles;
    } catch (error) {
      throw new Error("Failed to get articles");
    }
  }
);
