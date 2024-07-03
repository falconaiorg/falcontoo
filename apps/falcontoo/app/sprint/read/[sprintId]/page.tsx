"use client";
import { BackBar } from "@/components/back-bar";
import { url } from "@/urls";
import { SprintArticles } from "./sprint-articles";
import { api } from "@falcon/trpc/next/client";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SessionReader({
  params,
}: {
  params: { sprintId: string };
}) {
  const { sprintId } = params;

  return (
    <div className="h-full">
      <BackBar link={url.home} noText />
      <Suspense
        fallback={
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Loading Sprint</CardTitle>
            </CardHeader>
            <CardContent className="h-screen">
              <Skeleton className="h-full rounded" />
            </CardContent>
          </Card>
        }
      >
        <Articles sprintId={sprintId} />
      </Suspense>
    </div>
  );
}

const Articles = ({ sprintId }: { sprintId: string }) => {
  const [sprint] = api.sprint.getSprint.useSuspenseQuery({ sprintId });
  if (!sprint) {
    return null;
  }

  // Transform sprintArticles to match the expected type for SprintArticles component
  const articles = sprint.sprintArticles.map((sprintArticle) => ({
    ...sprintArticle.article,
    content: sprintArticle.article.content,
  }));
  return <SprintArticles articles={articles} />;
};
