import { LampContainer } from "@/components/ui/lamp";
import { RecommendedArticles } from "./recommended-articles";
import { server } from "@falcon/lib/server/next";
import { auth, getServerComponentSession } from "@falcon/lib/next-auth";
import { Suspense } from "react";
import { ReadingHistory } from "./reading-history";
import { WeeklyActivity } from "./weekly-activity";
import { Skeleton } from "@/components/ui/skeleton";
import { UserStats } from "./user-stats";
import { StartSprint } from "./start-sprint";
import { WelcomeScreen } from "./welcome-screen";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    return null;
  }
  const hasArticles = await server.article.checkIfUserHasArticles(
    session.user.id,
  );
  if (!hasArticles) {
    return <WelcomeScreen fullName={session.user.name} />;
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 p-4 pb-96 md:grid-cols-2">
      {/* <SessionProgress /> */}
      <StartSprint />
      <Suspense fallback={<Skeleton className="h-40 rounded" />}>
        <UserStats />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-56 rounded" />}>
        <WeeklyActivity />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-64 rounded" />}>
        <ReadingHistory />
      </Suspense>
    </div>
    // <LampContainer className="h-full">
    //   {/* <RecommendedArticles articles={articles} /> */}
    //   <ImprovedLayout />
    // </LampContainer>
  );
}
