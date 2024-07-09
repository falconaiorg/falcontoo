"use client";
import Link from "next/link";
import { url } from "@/urls";
import { ArticleCard } from "./article-card";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cn } from "@/lib/utils";
import { fonts } from "@falcon/lib/fonts";
import { AddArticle } from "./add-article";

export const ArticleList = ({
  articles,
}: {
  articles: ArticleWithContent[];
}) => {
  const [animationParent] = useAutoAnimate();
  const [unread, setUnread] = useState(false);
  const filteredArticles = unread
    ? articles.filter((a) => a.readingProgress === 0)
    : articles;
  const length = filteredArticles.length;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center justify-between space-x-2">
        <div className="flex flex-row items-center space-x-2">
          <div
            className={cn("p-2 text-xs", fonts.serif.lora, {
              "rounded bg-secondary": unread,
            })}
          >
            {length} articles
          </div>
          <Button
            className="hover:bg-inherit hover:text-inherit"
            variant={unread ? "secondary" : "outline"}
            size={"sm"}
            onClick={() => setUnread((unread) => !unread)}
          >
            unread
          </Button>
        </div>
        <AddArticle />
      </div>
      <div className="mt-8 flex flex-col gap-4 pb-96" ref={animationParent}>
        {filteredArticles.map((article) => (
          <Link
            href={url.reader.read({ articleId: article.id })}
            key={article.id}
          >
            <ArticleCard article={article} />
          </Link>
        ))}
        <div className="mt-10 text-center text-xl font-bold text-slate-700">
          {"That's all folks!"}
        </div>
      </div>
    </div>
  );
};
