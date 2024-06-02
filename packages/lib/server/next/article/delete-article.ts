"use server";
import prisma from "@falcon/prisma";
import { TRPCError } from "@trpc/server";
import to from "await-to-js";
import { checkArticleOwnership } from "../../../ai/auth";

export async function deleteArticleForUser({
  articleId,
}: {
  articleId: string;
}) {
  await checkArticleOwnership({ articleId });
  const [err] = await to(
    prisma.article.delete({
      where: { id: articleId },
    })
  );
  if (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error deleting article",
      cause: err,
    });
  }
}
