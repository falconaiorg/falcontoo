import { getServerComponentSession } from "@/auth";
import prisma from "@/prisma";
import { TRPCError } from "@trpc/server";
import to from "await-to-js";

export async function checkArticleOwnership({
  articleId,
}: {
  articleId: string;
}) {
  const { user } = await getServerComponentSession();
  const userId = user.id;
  const [err, article] = await to(
    prisma.article.findFirst({
      where: {
        id: articleId,
        userId: userId,
      },
    }),
  );

  if (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
      cause: err,
    });
  }
  const isOwner = article !== null;
  if (!isOwner) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You don't have the permission to access this article",
      cause: err,
    });
  }
  return { article };
}
