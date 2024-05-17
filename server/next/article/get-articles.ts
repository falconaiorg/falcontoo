import prisma from "@/prisma";
import { cache } from "@/server/cache";

export const getArticlesbyUserId = cache.next(
  async ({ userId }: { userId: string }) => {
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
        throw new Error("User not found");
      }
      return userWithArticles.articles;
    } catch (error) {
      throw new Error("Failed to get articles");
    }
  },
  [],
  {
    tags: ["articles", "user"],
  },
);
