"use server";
import { TRPCError } from "@trpc/server";
import prisma from "@/prisma";
import { getServerComponentSession } from "@/auth";
import { revalidatePath } from "next/cache";
import { parseWithPostlight, parseWithReadability } from "@/lib/parser/html";
import { ParsedArticle } from "@/lib/parser/types";

const saveArticle = async (url: string, articleData: ParsedArticle) => {
  const { user } = await getServerComponentSession();
  const newArticle = await prisma.article.create({
    data: {
      ...articleData,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  revalidatePath("/");
  return newArticle;
};

export async function fetchArticle(url: string | undefined) {
  try {
    if (!url) {
      return;
    }
    let content: string;
    try {
      const article = await parseWithReadability(url);
      await saveArticle(url, article);
      content = article.content;
    } catch (err) {
      const article = await parseWithPostlight(url);
      await saveArticle(url, article);
      content = article.content;
    }

    return content;
  } catch (err) {
    console.log(err);
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "This article is not readable. We are working on it.",
      cause: err,
    });
  }
}
