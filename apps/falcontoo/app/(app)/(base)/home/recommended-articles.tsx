"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { ArticleWithContent } from "@falcon/lib/server/next/article";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { getSnoozeDate, snoozeOptions } from "./snooze-config";
import { format } from "date-fns-tz";
import { api } from "@falcon/trpc/next/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { url } from "@/urls";
import { useSoundEffect } from "@/hooks/use-sound-effect";
import { sounds } from "@/sounds";

export function RecommendedArticles({
  articles,
}: {
  articles: ArticleWithContent[];
}) {
  const { playSound } = useSoundEffect(sounds.snooze);

  const router = useRouter();

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null,
  );

  //console.log(articles.length);
  const { mutateAsync: snoozeArticle } =
    api.articles.snoozeArticle.useMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [displayedArticles, setDisplayedArticles] = useState(
    articles.slice(0, 3),
  );

  //console.log(displayedArticles.length);

  const handleSnooze = async ({
    articleId,
    snoozeDate,
  }: {
    articleId: string;
    snoozeDate: Date;
  }) => {
    setIsOpen(false);
    playSound();
    setDisplayedArticles((prevArticles) => {
      const updatedArticles = prevArticles.filter(
        (article) => article.id !== articleId,
      );

      if (updatedArticles.length < prevArticles.length) {
        const remainingOriginalArticles = articles.filter(
          (article) =>
            !updatedArticles.some((a) => a.id === article.id) &&
            !prevArticles.some((a) => a.id === article.id),
        );

        const nextArticle = remainingOriginalArticles[0];
        if (nextArticle) {
          updatedArticles.push(nextArticle);
        }
      }

      return updatedArticles;
    });

    await snoozeArticle({
      articleId,
      snoozeDate,
    });
  };
  return (
    <div
      className={cn("mt-24 flex w-full flex-col items-center space-y-8", {
        "mt-36 justify-center": displayedArticles.length === 0,
      })}
    >
      {displayedArticles.length === 0 && (
        <div className="flex w-full flex-col items-center space-y-4">
          <h1 className="font-serif text-xl font-bold">Congratulations!!</h1>
          <h2>You are all done</h2>
          {articles.length > 0 && (
            <Button onClick={() => router.refresh()}>Load More</Button>
          )}
        </div>
      )}
      {displayedArticles.map((article, index) => (
        <motion.h1
          key={article.id}
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className=" w-11/12 bg-gradient-to-br bg-clip-text"
        >
          <Card
            key={article.id}
            className={cn("border-none shadow-inner", {
              "shadow-cyan-500": index === 0,
              "shadow-cyan-700": index === 1,
              "shadow-cyan-900": index === 2,
            })}
          >
            <CardHeader>
              <CardTitle className="line-clamp-2 text-sm font-medium">
                {article.content.title}
              </CardTitle>
              <CardDescription className="flex flex-row justify-between text-xs">
                <div>{format(article.createdAt, "MMM d")}</div>
                <div className="font-semibold tracking-tight">
                  {100 - article.readingProgress}% left
                </div>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-row items-center justify-end space-x-4">
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => {
                  setSelectedArticleId(article.id);
                  setIsOpen(true);
                }}
              >
                Snooze
              </Button>
              <Link href={url.reader.read({ articleId: article.id })}>
                <Button variant={"default"} size={"sm"}>
                  Read
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.h1>
      ))}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          {snoozeOptions.map((option) => {
            const { date, formattedDate } = getSnoozeDate(option.value);
            return (
              <Button
                key={option.value}
                variant={"ghost"}
                className="flex w-full flex-row items-center justify-between"
                onClick={() => {
                  if (selectedArticleId) {
                    handleSnooze({
                      articleId: selectedArticleId,
                      snoozeDate: date,
                    });
                  }
                }}
              >
                <div>{option.label}</div>
                <div>{formattedDate}</div>
              </Button>
            );
          })}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
