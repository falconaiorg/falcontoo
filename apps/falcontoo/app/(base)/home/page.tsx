import { LampContainer } from "@/components/ui/lamp";
import { RecommendedArticles } from "./recommended-articles";
import { server } from "@falcon/lib/server/next";
import { getServerComponentSession } from "@falcon/lib/next-auth";

export default async function HomePage() {
  const { user } = await getServerComponentSession();
  const articles = await server.article.getRecommendedArticles({
    userId: user.id,
  });
  return (
    <LampContainer className="h-full">
      <RecommendedArticles articles={articles} />
    </LampContainer>
  );
}
