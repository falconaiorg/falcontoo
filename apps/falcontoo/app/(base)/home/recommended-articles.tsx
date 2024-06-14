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
import {
  SnoozeOptionValue,
  getSnoozeDate,
  snoozeOptions,
} from "./snooze-config";
import { format } from "date-fns-tz";
import { server } from "@falcon/lib/server/next";
import { api } from "@falcon/trpc/next/client";

export function RecommendedArticles({
  articles,
}: {
  articles: ArticleWithContent[];
}) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null,
  );

  console.log(articles.length);
  const { mutateAsync: snoozeArticle } =
    api.articles.snoozeArticle.useMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [displayedArticles, setDisplayedArticles] = useState(
    articles.slice(0, 3),
  );

  console.log(displayedArticles.length);

  const handleSnooze = async ({
    articleId,
    snoozeDate,
  }: {
    articleId: string;
    snoozeDate: Date;
  }) => {
    setIsOpen(false);
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
    <div className="mt-20 flex w-full flex-col items-center space-y-10">
      {displayedArticles.map((article) => (
        <motion.h1
          key={article.id}
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className=" w-11/12 bg-gradient-to-br bg-clip-text py-4"
        >
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.content.title}</CardTitle>
              <CardDescription>
                {format(article.createdAt, "MMM d, h:mm a")}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-row items-center justify-end space-x-4">
              <Button
                variant={"outline"}
                onClick={() => {
                  setSelectedArticleId(article.id);
                  setIsOpen(true);
                }}
              >
                Snooze
              </Button>
              <Button variant={"default"}>Read</Button>
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
