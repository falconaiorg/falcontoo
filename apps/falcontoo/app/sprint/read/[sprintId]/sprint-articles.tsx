"use client";
import { ArticleRenderer } from "@/app/(reader)/read/[articleId]/article-renderer";
import { ArticleSkeleton } from "@/app/(reader)/read/[articleId]/article-skeleton";
import { Button } from "@/components/ui/button";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckBadgeIcon } from "@/components/icons";
export function SprintArticles({
  articles,
}: {
  articles: ArticleWithContent[];
}) {
  const parent = useRef(null);
  

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const [currentArticleId, setCurrentArticleId] = useState(articles[0].id);

  return (
    <div ref={parent} className="p-2">
      <div className="flex space-x-2 overflow-auto scrollbar-hide">
        {articles.map((article) => (
          <Button
            key={article.id}
            variant={
              currentArticleId === article.id && article.readingProgress === 100
                ? "secondary"
                : currentArticleId === article.id
                  ? "default"
                  : "outline"
            }
            onClick={() => setCurrentArticleId(article.id)}
            className={cn("w-1/3", {
              "border-emerald-500 text-muted-foreground line-through decoration-emerald-500":
                article.readingProgress === 100,
            })}
          >
            <div className="flex w-full flex-row items-center space-x-3 truncate ">
              <div className="w-4">
                {article.readingProgress === 100 ? (
                  <CheckBadgeIcon className="text-emerald-500" size="sm" />
                ) : null}
              </div>
              <div className="truncate">{article.content.title}</div>
            </div>
          </Button>
        ))}
      </div>
      <section>
        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              display: currentArticleId === article.id ? "block" : "none",
            }}
          >
            <Suspense fallback={<ArticleSkeleton />}>
              <ArticleRenderer article={article} />
            </Suspense>
          </div>
        ))}
      </section>
    </div>
  );
}
