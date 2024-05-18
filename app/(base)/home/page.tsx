import { getServerComponentSession } from "@/auth";
import { ArticleList } from "./article-card";
import { queries } from "@/server/next";
import Link from "next/link";
import { testArticles } from "./test-article";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const { user } = await getServerComponentSession();
  const articles = await queries.article.getArticlesbyUserId({
    userId: user.id,
  });
  return (
    <div className="px-4 py-2">
      <div className="flex flex-col space-y-3">
      </div>
      <ArticleList articles={articles} />
    </div>
  );
}
