"use server";
import { TRPCError } from "@trpc/server";
import { getServerComponentSession } from "@falcon/lib/next-auth";
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
  const session = await getServerComponentSession();
  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Login to perform action",
    });
  }
  const userId = session.user.id;
  const parsedUrl = await parseUrl({ url: articleUrl });
  const article = await parseArticle({ url: parsedUrl });
  const savedArticle = await saveArticle({ userId, articleData: article });
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
