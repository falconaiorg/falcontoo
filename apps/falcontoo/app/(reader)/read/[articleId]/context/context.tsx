import { ai } from "@falcon/lib/ai";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import { ContextContent } from "./context-content";
import { Analysis } from "@falcon/lib/ai/context/analysis/generate-analysis";
export async function ArticleContext({ articleId }: { articleId: string }) {
  // const context = await ai.context.getArticleContext({
  //   article,
  // });
  const context = "This is a sample context";
  const analysis = await ai.analysis.getArticleAnalysis({
    articleId,
  });
  return <ContextContent context={context} analysis={analysis} />;
}
