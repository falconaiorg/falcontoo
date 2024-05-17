import { cache } from "@/server/cache";
import { TRPCError } from "@trpc/server";
import { checkArticleAccess } from "./access";

export const getArticlebyArticleId = cache.next(
  async ({ articleId, userId }: { articleId: string; userId: string }) => {
    const { hasAccess, article } = await checkArticleAccess({
      articleId,
      userId,
    });

    if (!hasAccess) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User does not own article",
      });
    }
    return article;
  },
  [],
  {
    tags: ["articles", "user"],
  },
);
