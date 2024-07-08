import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ArticleSkeleton = () => {
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
