import { ai } from "@falcon/lib/ai";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import { ContextContent } from "./context-content";
export async function ArticleContext({
  article,
}: {
  article: ArticleWithContent;
}) {
  const context = await ai.context.getArticleContext({
    article,
  });
  return <ContextContent context={context} />;
}
