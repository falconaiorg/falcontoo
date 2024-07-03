"use client";
import { BackBar } from "@/components/back-bar";
import { url } from "@/urls";
import { SprintArticles } from "./sprint-articles";
import { server } from "@falcon/lib/server/next";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import { api } from "@falcon/trpc/next/client";

export default function SessionReader({
  params,
}: {
  params: { sprintId: string };
}) {
  const { sprintId } = params;
  const [sprint] = api.sprint.getSprint.useSuspenseQuery({ sprintId });
  if (!sprint) {
    return null;
  }

  // Transform sprintArticles to match the expected type for SprintArticles component
  const articles = sprint.sprintArticles.map((sprintArticle) => ({
    ...sprintArticle.article,
    content: sprintArticle.article.content,
  }));

  return (
    <div className="h-full">
      <BackBar link={url.home} noText />
      <SprintArticles articles={articles} />
    </div>
  );
}
