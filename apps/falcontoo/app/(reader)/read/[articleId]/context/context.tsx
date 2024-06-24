import { ai } from "@falcon/lib/ai";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import { ContextContent } from "./context-content";
import { Analysis } from "@falcon/lib/ai/context/analysis/generate-analysis";
export async function ArticleContext({
  article,
  analysis,
}: {
  article: ArticleWithContent;
  analysis: Analysis;
}) {
  const context = await ai.context.getArticleContext({
    article,
  });
  return <ContextContent context={context} analysis={analysis} />;
}
