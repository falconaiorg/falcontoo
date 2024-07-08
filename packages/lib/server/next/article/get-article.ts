import { TRPCError } from "@trpc/server";
import { checkArticleAccess } from "./access";

export const getArticleByArticleId = async ({
  articleId,
  userId,
}: {
  articleId: string;
  userId: string;
}) => {
  const { hasAccess, articleWithContent } = await checkArticleAccess({
    articleId,
    userId,
  });

  if (!hasAccess) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User does not own article",
    });
  }
  return articleWithContent;
};

export type ArticleWithContent = Awaited<
  ReturnType<typeof getArticleByArticleId>
>;
