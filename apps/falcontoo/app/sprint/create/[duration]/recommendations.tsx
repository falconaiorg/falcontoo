"use client";
import { url } from "@/urls";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AddIcon, MinusIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SprintDuration } from "@/app/(base)/home/start-sprint";
import { api } from "@falcon/trpc/next/client";
import { useSoundEffect } from "@/hooks/use-sound-effect";
import { sounds } from "@/sounds";
const ArticleCard = ({
  type,
  action,
  article,
}: {
  type: "add" | "remove";
  action: () => void;
  article?: ArticleRec;
}) => {
  return (
    <Card className={cn("flex flex-row items-center justify-between pr-4")}>
      <CardHeader>
        <CardTitle className="line-clamp-2 text-sm font-medium leading-5">
          {article?.title}
        </CardTitle>
      </CardHeader>
      <Button
        size={"icon"}
        variant={type === "add" ? "secondary" : "outline"}
        onClick={action}
        className="min-w-10"
      >
        {type === "add" ? <AddIcon size="sm" /> : <MinusIcon size="sm" />}
      </Button>
    </Card>
  );
};

type SprintArticle = {
  articleId: string;
  order: number;
};

export type ArticleRec = {
  articleId: string;
  title: string;
  readingProgress: number;
};

export function Recommendations({
  articles,
  duration,
}: {
  articles: ArticleRec[];
  duration: SprintDuration;
}) {
  const { playSound: playAddSound } = useSoundEffect(sounds.check, {
    vibrate: "md",
  });
  const { playSound: playRemoveSound } = useSoundEffect(sounds.snooze, {
    vibrate: "md",
  });
  const apiUtils = api.useUtils();
  const [redirecting, setRedirecting] = useState(false);

  const { mutate: createSprintWithArticles, isPending } =
    api.sprint.createSprintWithArticles.useMutation({
      onSuccess: ({ sprint }) => {
        setRedirecting(true);
        router.push(url.sprint.read({ sprintId: sprint.id }));
        apiUtils.sprint.invalidate();
      },
    });
  const [animationParent] = useAutoAnimate();

  const [sprintArticles, setSprintArticles] = useState<SprintArticle[]>(
    articles.slice(0, Math.round(duration / 5)).map((article, index) => ({
      articleId: article.articleId,
      order: index,
    })),
  );

  const [sprintDuration, setSprintDuration] = useState<number>(duration);

  const [availableArticles, setAvailableArticles] = useState<ArticleRec[]>(
    articles.slice(3),
  );
  const sessionId = "1234";
  const router = useRouter();

  const createSession = () => {
    createSprintWithArticles({
      articles: sprintArticles,
      durationInMins: sprintDuration,
    });
  };

  const addArticleToSprint = (article: ArticleRec) => {
    playAddSound();
    setSprintArticles((prev) => [
      ...prev,
      { articleId: article.articleId, order: prev.length },
    ]);
    setAvailableArticles((prev) =>
      prev.filter((a) => a.articleId !== article.articleId),
    );
    if (sprintArticles.length === 0) {
      setSprintDuration(duration);
    } else {
      setSprintDuration((prev) => prev + 5);
    }
  };

  const removeArticleFromSprint = (articleId: string) => {
    playRemoveSound();
    setSprintArticles((prev) =>
      prev.filter((sprintArticle) => sprintArticle.articleId !== articleId),
    );
    const article = articles.find((a) => a.articleId === articleId);
    if (article) {
      setAvailableArticles((prev) => [...prev, article]);
    }

    if (sprintArticles.length === 1) {
      setSprintDuration(0);
    } else {
      setSprintDuration((prev) => prev - 5);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Card className="border-cyan-600">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex flex-col space-y-1">
            <CardTitle>Recommended Articles</CardTitle>
            <CardDescription>
              Reading Time: {sprintDuration} minutes
            </CardDescription>
          </div>
          <Button
            variant={"default"}
            onClick={createSession}
            disabled={isPending || sprintArticles.length === 0 || redirecting}
          >
            {isPending ? "Creating..." : "Start Sprint"}
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3" ref={animationParent}>
          {sprintArticles.map((sprintArticle) => {
            const article = articles.find(
              (article) => article.articleId === sprintArticle.articleId,
            );
            return (
              <ArticleCard
                key={sprintArticle.articleId}
                article={article}
                type="remove"
                action={() => removeArticleFromSprint(article?.articleId ?? "")}
              />
            );
          })}
        </CardContent>
      </Card>
      <CardContent className="flex flex-col space-y-3">
        {availableArticles.map((article) => (
          <ArticleCard
            key={article.articleId}
            article={article}
            type="add"
            action={() => addArticleToSprint(article)}
          />
        ))}
      </CardContent>
    </div>
  );
}
