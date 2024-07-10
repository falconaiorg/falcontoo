"use client";
import { ContextContent } from "./context-content";
import { api } from "@falcon/trpc/next/client";
export function ArticleContext({ articleId }: { articleId: string }) {
  const context = "This is a sample context";
  const [article, {}] = api.articles.getArticle.useSuspenseQuery({
    articleId,
  });

  if (!article.isParsed) {
    return null;
  }
  return <ContextContent context={context} articleId={articleId} />;
}
