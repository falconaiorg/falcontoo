"use server";
import { TRPCError } from "@trpc/server";
import prisma from "@/prisma";
import { getServerComponentSession } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { parseWithPostlight, parseWithReadability } from "@/lib/parser/html";
import { ParsedArticle } from "@/lib/parser/types";
import { redirect } from "next/navigation";
import { url } from "@/urls";

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
  revalidateTag("articles");
  return newArticle;
};

export async function fetchArticle(articleUrl: string | undefined) {
  try {
    if (!articleUrl) {
      return;
    }
    let content: string;
    try {
      const article = await parseWithReadability(articleUrl);
      await saveArticle(articleUrl, article);
      content = article.content;
    } catch (err) {
      const article = await parseWithPostlight(articleUrl);
      await saveArticle(articleUrl, article);
      content = article.content;
    }
  } catch (err) {
    console.log(err);
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "This article is not readable. We are working on it.",
      cause: err,
    });
  }

  redirect(url.home);
}
