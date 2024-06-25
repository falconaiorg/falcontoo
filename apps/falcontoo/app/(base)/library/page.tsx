import { getServerComponentSession } from "@falcon/lib/next-auth";
import { ArticleList } from "./article-list";
import { server } from "@falcon/lib/server/next";
import Link from "next/link";
import { testArticles } from "./test-article";
import { Button } from "@/components/ui/button";
import { LexLoading } from "@/components/loading/base-loading";

export default async function HomePage() {
  const { user } = await getServerComponentSession();
  const articles = await server.article.getArticlesbyUserId({
    userId: user.id,
  });
  return (
    <div className="px-4 py-2">
      <div className="flex flex-col space-y-3"></div>
      <ArticleList articles={articles} />
    </div>
  );
}
