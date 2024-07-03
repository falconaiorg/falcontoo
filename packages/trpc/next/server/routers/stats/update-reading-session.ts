import prisma from "@falcon/prisma";
import { Prisma } from "@falcon/prisma/client";

import { z } from "zod";

export const ZUserStatsUpdateSchema = z.object({
  userId: z.string(),
  articleId: z.string(),
  activeTime: z.number(),
  idleTime: z.number(),
  totalTime: z.number(),
  readingSessionId: z.string(),
  isCompleted: z.boolean(),
});

type UserStatsUpdate = z.infer<typeof ZUserStatsUpdateSchema>;

async function updateUserStats({
  userId,
  articleId,
  activeTime,
  idleTime,
  totalTime,
  readingSessionId,
  isCompleted,
}: UserStatsUpdate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  console.log("Updating user stats");
  try {
    await prisma.$transaction(async (tx) => {
      await updateUserStatsTable(tx, userId, totalTime, now);
      await updateDailyUserStats(tx, userId, today, activeTime, totalTime);
      await updateReadingSession(
        tx,
        readingSessionId,
        activeTime,
        idleTime,
        totalTime,
        isCompleted,
        now
      );
      await updateSessionArticles(
        tx,
        readingSessionId,
        articleId,
        activeTime,
        idleTime,
        totalTime
      );
    });
    console.log("User stats updated successfully");
  } catch (error) {
    console.error("Error updating user stats:", error);
    throw error;
  }
}

async function updateUserStatsTable(
  tx: Prisma.TransactionClient,
  userId: string,
  totalTime: number,
  now: Date
) {
  const userStats = await tx.userStats.findUnique({ where: { userId } });
  const lastUpdate = await getLastUpdateDate(tx, userId);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const currentStreak = calculateStreak(
    lastUpdate,
    today,
    userStats?.currentStreak || 0
  );

  await tx.userStats.upsert({
    where: { userId },
    create: {
      userId,
      totalReadingTime: totalTime,
      currentStreak,
      longestStreak: currentStreak,
      bestReadingDay: now,
      bestReadingDayTime: totalTime,
    },
    update: {
      totalReadingTime: { increment: totalTime },
      currentStreak,
      longestStreak: Math.max(userStats?.longestStreak || 0, currentStreak),
      bestReadingDay:
        userStats && totalTime > userStats.bestReadingDayTime ? now : undefined,
      bestReadingDayTime: Math.max(
        userStats?.bestReadingDayTime || 0,
        totalTime
      ),
    },
  });
}

async function getLastUpdateDate(
  tx: Prisma.TransactionClient,
  userId: string
): Promise<Date> {
  const lastDailyStats = await tx.dailyUserStats.findFirst({
    where: { userId },
    orderBy: { date: "desc" },
    select: { date: true },
  });
  return lastDailyStats?.date || new Date(0);
}

function calculateStreak(
  lastUpdate: Date,
  today: Date,
  currentStreak: number
): number {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    (today.getTime() - lastUpdate.getTime()) / oneDayMs
  );

  if (diffDays === 0) return currentStreak; // Same day, streak unchanged
  if (diffDays === 1) return currentStreak + 1; // Consecutive day, increase streak
  return 1; // Streak broken, reset to 1
}

async function updateDailyUserStats(
  tx: Prisma.TransactionClient,
  userId: string,
  today: Date,
  activeTime: number,
  totalTime: number
) {
  await tx.dailyUserStats.upsert({
    where: { date_userId: { date: today, userId } },
    create: {
      date: today,
      userId,
      totalTime,
      activeTime,
      articlesRead: 1,
    },
    update: {
      totalTime: { increment: totalTime },
      activeTime: { increment: activeTime },
      articlesRead: { increment: 1 },
    },
  });
}

async function updateReadingSession(
  tx: Prisma.TransactionClient,
  readingSessionId: string,
  activeTime: number,
  idleTime: number,
  totalTime: number,
  isCompleted: boolean,
  now: Date
) {
  await tx.readingSession.update({
    where: { id: readingSessionId },
    data: {
      activeTime: { increment: activeTime },
      idleTime: { increment: idleTime },
      totalTime: { increment: totalTime },
      completed: isCompleted,
      endTime: isCompleted ? now : undefined,
    },
  });
}

async function updateSessionArticles(
  tx: Prisma.TransactionClient,
  readingSessionId: string,
  articleId: string,
  activeTime: number,
  idleTime: number,
  totalTime: number
) {
  await tx.sessionArticles.upsert({
    where: { readingSessionId_articleId: { readingSessionId, articleId } },
    create: {
      readingSessionId,
      articleId,
      activeTime,
      idleTime,
      totalTime,
    },
    update: {
      activeTime: { increment: activeTime },
      idleTime: { increment: idleTime },
      totalTime: { increment: totalTime },
    },
  });
}

export { updateUserStats };
