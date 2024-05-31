import prisma from "@/prisma";
import { TRPCError } from "@trpc/server";

export const checkArticleAccess = async ({
  articleId,
  userId,
}: {
  articleId: string;
  userId: string;
}) => {
  try {
    const articleWithContent = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        content: true,
      },
    });
    if (!articleWithContent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Article not found",
      });
    }
    const hasAccess = articleWithContent.userId === userId;

    if (!hasAccess) {
      return { hasAccess, articleWithContent };
    }
    return { hasAccess, articleWithContent };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error fetching article",
    });
  }
};
