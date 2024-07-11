"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import { cn } from "@/lib/utils";
import { usePrefetchArticle } from "@/hooks/query/usePrefetchArticle";

export const ArticleCard = ({ article }: { article: ArticleWithContent }) => {
  const { prefetchArticle } = usePrefetchArticle();

  return (
    <motion.div
      className="cursor-pointer"
      whileTap={{
        scale: 0.98,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      onViewportEnter={() => prefetchArticle({ articleId: article.id })}
    >
      <Card
        className={cn("flex h-32 flex-row items-center justify-between px-1", {
          "border-neutral-700": article.readingProgress !== 100,
          "brightness-75": article.readingProgress === 100,
        })}
      >
        <CardHeader>
          <CardTitle className="line-clamp-2 text-sm font-medium leading-5">
            {article.content.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs">
            {article.content.description}
          </CardDescription>
          <CardDescription className="flex flex-row justify-between text-xs">
            <span className="font-semibold tracking-tight">
              {article.readingProgress === 100 ? "Read" : `Unread`}
            </span>
          </CardDescription>{" "}
        </CardHeader>
      </Card>
    </motion.div>
  );
};
