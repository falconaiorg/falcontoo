import { LampContainer } from "@/components/ui/lamp";
import { RecommendedArticles } from "./recommended-articles";
import { server } from "@falcon/lib/server/next";
import { getServerComponentSession } from "@falcon/lib/next-auth";
import { Suspense } from "react";
import { Soon } from "@/components/soon";
import { ReadingHistory } from "./reading-history";
import { WeeklyActivity } from "./weekly-activity";
import { Skeleton } from "@/components/ui/skeleton";
import { UserStats } from "./user-stats";
import { StartSprint } from "./start-sprint";

export default async function HomePage() {
  const { user } = await getServerComponentSession();
  const articles = await server.article.getRecommendedArticles({
    userId: user.id,
  });
  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 p-4 pb-96 md:grid-cols-2">
      {/* <SessionProgress /> */}
      <StartSprint />
      <UserStats />
      <WeeklyActivity />
      <Suspense fallback={<Skeleton className="h-64" />}>
        <ReadingHistory />
      </Suspense>
    </div>
    // <LampContainer className="h-full">
    //   {/* <RecommendedArticles articles={articles} /> */}
    //   <ImprovedLayout />
    // </LampContainer>
  );
}
