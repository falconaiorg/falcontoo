"use server";
import { TRPCError } from "@trpc/server";
import prisma from "@falcon/prisma";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { ArticleWithContent, ParsedArticle } from "@falcon/lib/parser/types";
import { redirect } from "next/navigation";
import { url } from "@/urls";
import { parseArticle } from "@falcon/lib/parser";
import { parseUrl } from "@falcon/lib/parser/url";
import { saveAsVector } from "@falcon/lib/ai/rag/save";
import to from "await-to-js";
import { server } from "@falcon/lib/server/next";
import { saveArticle } from "@falcon/lib/server/next/article/save-article";

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
