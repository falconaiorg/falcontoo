"use server";
import { TRPCError } from "@trpc/server";
import prisma from "@/prisma";
import { getServerComponentSession } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { ArticleWithContent, ParsedArticle } from "@/server/parser/types";
import { redirect } from "next/navigation";
import { url } from "@/urls";
import { parseArticle } from "@/server/parser";
import { parseUrl } from "@/server/parser/url";
import { saveAsVector } from "@/server/ai/rag/save";
import to from "await-to-js";
import { server } from "@/server/next";
import { saveArticle } from "@/server/next/article/save-article";

export async function fetchArticle(articleUrl: string | undefined) {
  if (!articleUrl) {
    return;
  }
  const parsedUrl = await parseUrl({ url: articleUrl });
  const article = await parseArticle({ url: parsedUrl });
  const savedArticle = await saveArticle(article);
  const [err] = await to(saveAsVector({ article: savedArticle }));
  if (err) {
    server.article.deleteArticleForUser({ articleId: savedArticle.id });
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error saving article. Try again.",
      cause: err,
    });
  }
  redirect(url.reader.read({ articleId: savedArticle.id }));
}
