"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@falcon/trpc/next/client";
import { BarChart } from "@tremor/react";
import { format } from "date-fns";

export const WeeklyActivity = () => {
  const [stats] = api.stats.getWeeklyStats.useSuspenseQuery();

  // Ensure stats data exists and is an array
  const validStats = Array.isArray(stats) ? stats : [];

  // Generate an array of the last 7 dates
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toLocaleDateString();
  }).reverse();

  // Create a map of stats by date
  const statsMap: {
    [key: string]: { "Active Reading": string; Reading: string };
  } = validStats.reduce(
    (
      acc: { [key: string]: { "Active Reading": string; Reading: string } },
      stat: (typeof validStats)[0],
    ) => {
      acc[new Date(stat.date).toLocaleDateString()] = {
        "Active Reading": (stat.activeTime / 60000).toFixed(2), // Convert milliseconds to minutes
        Reading: (stat.totalTime / 60000).toFixed(2), // Convert milliseconds to minutes
      };
      return acc;
    },
    {},
  );

  let weeklyData = validStats.map((stat) => ({
    date: new Date(stat.date).toLocaleDateString(),
    "Active Reading": (stat.activeTime / 60000).toFixed(2),
    Reading: (stat.totalTime / 60000).toFixed(2),
  }));

  if (validStats.length < 7) {
    weeklyData = last7Days.map((date) => ({
      date,
      "Active Reading": statsMap[date]?.["Active Reading"] || "0",
      Reading: statsMap[date]?.Reading || "0",
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last 7 Days</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <BarChart
          className="mt-2 h-60"
          data={weeklyData}
          index="date"
          categories={["Active Reading"]}
          yAxisWidth={40}
          showXAxis={false}
          showLegend={true}
          showTooltip={true}
          showAnimation
          maxValue={30}
          stack
          noDataText="Read more to see your weekly activity"
        />
      </CardContent>
    </Card>
  );
};
