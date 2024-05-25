import { getServerComponentSession } from "@/auth";
import prisma from "@/prisma";
import { Article } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const checkArticleOwnership = async function ({
  article,
}: {
  article: Article;
}) {
  const { user } = await getServerComponentSession();
  const userId = user.id;

  const hasOwnership = await prisma.article.findUnique({
    where: {
      id: article.id,
      user: {
        some: {
          id: userId,
        },
      },
    },
  });
  if (!hasOwnership) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You don't have the permission to access this article.",
    });
  }
};
