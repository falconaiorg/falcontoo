import { Suspense } from "react";
import { ArticleContext } from "./context/context";
import { Article } from "./article";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ReadPage({
  params,
}: {
  params: { articleId: string };
}) {
  const articleId = params.articleId;

  return (
    <div className="flex flex-col space-y-3 px-1.5 py-4">
      {/* <FilterButton /> */}
      <Suspense fallback={<ContextSkeleton />}>
        <ArticleContext articleId={articleId} />
      </Suspense>
      <Suspense fallback={<ArticleSkeleton />}>
        <Article articleId={articleId} />
      </Suspense>
    </div>
  );
}

const ArticleSkeleton = () => {
  const array = [...Array(5).keys()];
  return (
    <Card className="h-screen">
      <CardHeader>
        <Skeleton className="h-72" />
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {array.map((_, index) => (
          <Skeleton key={index} className="h-3" />
        ))}
      </CardContent>
      <CardContent className="flex flex-col space-y-2">
        {array.map((_, index) => (
          <Skeleton key={index} className="h-3" />
        ))}
      </CardContent>
      <CardContent className="flex flex-col space-y-2">
        {array.map((_, index) => (
          <Skeleton key={index} className="h-3" />
        ))}
      </CardContent>
    </Card>
  );
};

function ContextSkeleton() {
  return (
    <Card className="min-h-42 relative bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] ">
      <CardHeader>
        <CardTitle className="font-serif text-sm">Analysing...</CardTitle>
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
      </CardHeader>
    </Card>
  );
}
