"use client";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import { api } from "@falcon/trpc/next/client";
import { server } from "@falcon/lib/server/next";
import { ArticleRenderer } from "./article-renderer";
const searchWords = [
  "This is a sample markdown text. The words 'sample' and 'markdown'",
];
export function Article({ articleId }: { articleId: string }) {
  const [article, {}] = api.articles.getArticle.useSuspenseQuery({
    articleId,
  });

  return <ArticleRenderer article={article} />;
}
