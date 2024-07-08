"use client";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import { ContextContent } from "./context-content";
import { Analysis } from "@falcon/lib/ai/context/analysis/generate-analysis";
import { api } from "@falcon/trpc/next/client";
export function ArticleContext({ articleId }: { articleId: string }) {
  // const context = await ai.context.getArticleContext({
  //   article,
  // });
  const context = "This is a sample context";
  const [analysis] = api.articles.getArticleAnalysis.useSuspenseQuery({
    articleId,
  });
  return <ContextContent context={context} analysis={analysis} />;
}
