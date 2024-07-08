import { getServerComponentSession } from "@falcon/lib/next-auth";
import { ArticleList } from "./article-list";
import { server } from "@falcon/lib/server/next";
import Link from "next/link";
import { testArticles } from "./test-article";
import { Button } from "@/components/ui/button";
import { LexLoading } from "@/components/loading/base-loading";
import { SaveArticles } from "../home/welcome/save-articles";

export default async function HomePage() {
  const { user } = await getServerComponentSession();
  const articles = await server.article.getArticlesbyUserId({
    //TODO Fix spelling b -> B
    userId: user.id,
  });
  const noArticles = articles.length === 0;
  if (noArticles) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <SaveArticles />
      </div>
    );
  }
  return (
    <div className="px-4 py-2">
      <ArticleList articles={articles} />
    </div>
  );
}
