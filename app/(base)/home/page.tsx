import { auth, getServerComponentSession } from "@/auth";
import { ArticleList } from "./article-card";
import { CardList } from "./session-card";
import { queries } from "@/server/next";
import { Suspense } from "react";

export default async function HomePage() {
  const { user } = await getServerComponentSession();
  const articles = await queries.article.getArticlesbyUserId({
    userId: user.id,
  });
  return (
    <div className="px-4 py-2">
      <ArticleList articles={articles} />
    </div>
  );
}
