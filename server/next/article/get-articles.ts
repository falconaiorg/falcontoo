import prisma from "@/prisma";
import { cache } from "@/server/cache";

export const getArticlesbyUserId = cache.react(
  async ({ userId }: { userId: string }) => {
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
  },
);
