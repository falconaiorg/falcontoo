"use client";
import { format } from "date-fns";

interface UserStatsProps {
  totalReadingTime: number;
  currentStreak: number;
  longestStreak: number;
  bestReadingDay?: string;
  bestReadingDayTime: number;
}
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@falcon/trpc/next/client";

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-lg font-bold">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

export const UserStats = () => {
  const [userStats] = api.stats.getUserStats.useSuspenseQuery();

  if (!userStats) {
    return null;
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardContent className="py-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {/* <StatItem
            label="Total Reading Time"
            value={`${totalReadingTime} mins`}
          /> */}
          <StatItem
            label="Current Streak"
            value={`${userStats?.currentStreak} days`}
          />
          <StatItem
            label="Longest Streak"
            value={`${userStats?.longestStreak} days`}
          />
          <StatItem
            label="Best Day"
            value={
              userStats?.bestReadingDay
                ? format(new Date(userStats.bestReadingDay), "MMM d, yyyy")
                : "N/A"
            }
          />
          <StatItem
            label="Best Day: Time"
            value={`${userStats?.bestReadingDayTime ? Math.round(userStats.bestReadingDayTime / 1000) : 0} mins`}
          />
        </div>
      </CardContent>
    </Card>
  );
};
