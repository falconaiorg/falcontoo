import { BackBar } from "@/components/back-bar";
import { url } from "@/urls";
import { SessionArticles } from "./session-articles";
import { server } from "@falcon/lib/server/next";
import { getServerComponentSession } from "@falcon/lib/next-auth";

export default async function SessionReader() {
  const { user } = await getServerComponentSession();
  const testArticleId = "clxtq912b0000tw2yw1vq498h";
  const articleIds = [testArticleId, testArticleId, testArticleId];
  const article = await server.article.getArticlebyArticleId({
    articleId: testArticleId,
    userId: user.id,
  });
  const articleTwo = await server.article.getArticlebyArticleId({
    articleId: "clxtmjhuu00002f9mve7jidr6",
    userId: user.id,
  });
  const articles = [article, articleTwo];
  return (
    <div className="h-full">
      <BackBar link={url.home} noText />
      <SessionArticles articles={articles} />
    </div>
  );
}
