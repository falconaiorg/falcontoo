"use server";
import prisma from "@falcon/prisma";
import { TRPCError } from "@trpc/server";
import to from "await-to-js";

export const checkIfUserHasArticles = async (
  userId: string
): Promise<boolean> => {
  const [err, hasArticles] = await to(
    prisma.article.findFirst({
      where: {
        userId,
      },
    })
  );
  if (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to check if user has articles",
      cause: err,
    });
  }
  return !!hasArticles;
};
