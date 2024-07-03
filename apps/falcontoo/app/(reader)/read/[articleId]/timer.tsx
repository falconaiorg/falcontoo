"use client";
import { useIdleTimer } from "react-idle-timer";
import { useUnmount, useHarmonicIntervalFn } from "react-use";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { readingSessionIdAtom } from "../../components/drawer/atoms";
import { api } from "@falcon/trpc/next/client";

// Harmonic interval of 2 minutes
const INTERVAL = 1000 * 60 * 1; // 2 minutes

// 10 seconds update threshold
const UPDATE_THRESHOLD_ELAPSED_TIME = 1000 * 10;

// Idle timeout of 60 seconds
const IDLE_TIMEOUT = 1000 * 60;

export const Timer = ({
  articleId,
  userId,
}: {
  articleId: string;
  userId: string;
}) => {
  const apiUtils = api.useUtils();

  const [readingSessionId, setReadingSessionId] = useAtom(readingSessionIdAtom);
  const [lastSentActiveTime, setLastSentActiveTime] = useState(0);
  const [lastSentIdleTime, setLastSentIdleTime] = useState(0);

  const { getActiveTime, getIdleTime, getElapsedTime } = useIdleTimer({
    onIdle: () => {
      console.log("I'm idle");
    },
    onActive: () => console.log("I'm active"),
    timeout: IDLE_TIMEOUT,
    onAction: () => {},
    debounce: 500,
  });

  const { mutate: createReadingSession, isPending: isCreatingSession } =
    api.stats.createReadingSession.useMutation({
      retry: 3,
      onSuccess: (data) => {
        console.log("Reading session created", data);
        setReadingSessionId(data.readingSessionId);
        updateSession();
      },
      onError: (error) => {
        console.error("Failed to create reading session", error);
      },
    });
  const { mutate: updateReadingSession } =
    api.stats.updateReadingSession.useMutation({
      retry: 3,
      onError: (error) => {
        console.error("Failed to update reading session", error);
      },
      onSuccess: () => {
        const activeTime = getActiveTime();
        const idleTime = getIdleTime();
        setLastSentActiveTime(activeTime);
        setLastSentIdleTime(idleTime);
        apiUtils.stats.invalidate();
      },
    });

  useEffect(() => {
    if (!readingSessionId && !isCreatingSession) {
      console.log("Creating reading session");
      createReadingSession();
    } else {
      console.log("Reading session already exists", readingSessionId);
    }
  }, [readingSessionId, createReadingSession, isCreatingSession]);

  const updateSession = async () => {
    if (!readingSessionId) {
      return;
    }
    const activeTime = getActiveTime();
    const idleTime = getIdleTime();
    const elapsedTime = getElapsedTime();
    const activeTimeDelta = activeTime - lastSentActiveTime;
    const idleTimeDelta = idleTime - lastSentIdleTime;

    console.log("Updating session");
    updateReadingSession({
      activeTime: activeTimeDelta,
      idleTime: idleTimeDelta,
      totalTime: elapsedTime,
      readingSessionId: readingSessionId,
      articleId: articleId,
      userId: userId,
      isCompleted: false,
    });
  };

  useHarmonicIntervalFn(() => {
    updateSession();
  }, INTERVAL);

  useUnmount(() => {
    if (getElapsedTime() > UPDATE_THRESHOLD_ELAPSED_TIME) {
      console.log("unmounting");
      updateSession();
    } else {
      console.log("Not updating session, active time is too low");
    }
  });

  return null;
};
