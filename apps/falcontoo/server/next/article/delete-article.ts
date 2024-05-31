"use server";
import { getServerComponentSession } from "@/auth";
import prisma from "@/prisma";
import { checkArticleOwnership } from "@/server/ai/auth";
import { TRPCError } from "@trpc/server";
import to from "await-to-js";

export async function deleteArticleForUser({
  articleId,
}: {
  articleId: string;
}) {
  await checkArticleOwnership({ articleId });
  const [err] = await to(
    prisma.article.delete({
      where: { id: articleId },
    }),
  );
  if (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error deleting article",
      cause: err,
    });
  }
}
