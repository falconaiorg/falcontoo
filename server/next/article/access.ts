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
    const articleWithUser = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        user: {
          where: {
            id: userId,
          },
        },
      },
    });
    if (!articleWithUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Article not found",
      });
    }
    const hasAccess = articleWithUser.user.length > 0;

    const { user, ...article } = articleWithUser;

    if (!hasAccess) {
      return { hasAccess, article: null };
    }
    return { hasAccess, article };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error fetching article",
    });
  }
};
