import { BackBar } from "@/components/back-bar";
import { url } from "@/urls";
import { ArticleRec, Recommendations } from "./recommendations";
import { server } from "@falcon/lib/server/next";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import { Articles } from "./articles";
import { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const dummyArticles: ArticleRec[] = [
  {
    articleId: "1",
    title: "Understanding TypeScript Generics",
    readingProgress: 75,
  },
  {
    articleId: "2",
    title: "Exploring React Hooks",
    readingProgress: 50,
  },
  {
    articleId: "3",
    title: "Advanced State Management in Redux",
    readingProgress: 90,
  },
  {
    articleId: "4",
    title: "React Native vs Flutter",
    readingProgress: 25,
  },
  {
    articleId: "5",
    title: "Getting Started with GraphQL",
    readingProgress: 10,
  },
  {
    articleId: "6",
    title: "Building a RESTful API with Express",
    readingProgress: 0,
  },
  {
    articleId: "7",
    title: "Understanding TypeScript Generics",
    readingProgress: 75,
  },
  {
    articleId: "8",
    title: "Exploring React Hooks",
    readingProgress: 50,
  },
  {
    articleId: "9",
    title: "Advanced State Management in Redux",
    readingProgress: 90,
  },
  {
    articleId: "10",
    title: "React Native vs Flutter",
    readingProgress: 25,
  },
  {
    articleId: "11",
    title: "Getting Started with GraphQL",
    readingProgress: 10,
  },
  {
    articleId: "12",
    title: "Building a RESTful API with Express",
    readingProgress: 0,
  },
];

export default async function CreateSessionPage({
  params,
}: {
  params: { duration: string };
}) {
  const { duration } = params;

  return (
    <div className="h-full p-2">
      <BackBar link={url.home} noText />
      <Suspense
        fallback={
          <div className="flex flex-col space-y-4">
            <Card className="border-cyan-600">
              <CardHeader className="flex flex-row items-start justify-between">
                <CardTitle>Generating Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="h-screen px-0">
                <Skeleton className="h-full w-full" />
              </CardContent>
            </Card>
          </div>
        }
      >
        <Articles duration={Number(duration)} />
      </Suspense>
    </div>
  );
}
