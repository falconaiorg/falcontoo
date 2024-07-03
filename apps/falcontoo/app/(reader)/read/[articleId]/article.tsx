import { getServerComponentSession } from "@falcon/lib/next-auth";
import { server } from "@falcon/lib/server/next";
import { ArticleRenderer } from "./article-renderer";
const searchWords = [
  "This is a sample markdown text. The words 'sample' and 'markdown'",
];
export async function Article({ articleId }: { articleId: string }) {
  const { user } = await getServerComponentSession();
  const article = await server.article.getArticlebyArticleId({
    articleId,
    userId: user.id,
  });
  return <ArticleRenderer article={article} />;
  
}
