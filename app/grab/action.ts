"use server";
import { TRPCError } from "@trpc/server";
import prisma from "@/prisma";
import { getServerComponentSession } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { ParsedArticle } from "@/server/parser/types";
import { redirect } from "next/navigation";
import { url } from "@/urls";
import { parseArticle } from "@/server/parser";

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
  if (!articleUrl) {
    return;
  }
  let content: string;
  const article = await parseArticle({ url: articleUrl });
  const savedArticle = await saveArticle(articleUrl, article);
  content = article.content;
  console.log("Redirecting to home");
  redirect(url.reader.read({ articleId: savedArticle.id }));
}
