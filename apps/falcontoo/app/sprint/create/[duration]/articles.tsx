import { BackBar } from "@/components/back-bar";
import { url } from "@/urls";
import { ArticleRec, Recommendations } from "./recommendations";
import { server } from "@falcon/lib/server/next";
import { getServerComponentSession } from "@falcon/lib/next-auth";

export async function Articles({ duration }: { duration: number }) {
  const { user } = await getServerComponentSession();
  const articles = await server.article.getRecommendedArticles({
    userId: user.id,
  });

  const preparedArticles = articles.map((article) => ({
    articleId: article.id,
    title: article.content.title,
    readingProgress: article.readingProgress,
  }));

  return (
    <Recommendations articles={preparedArticles} duration={Number(duration)} />
  );
}
