"use client";
import { useCallback, useEffect, useRef } from "react";
import NoSleep from "nosleep.js";

function useNoSleep() {
  const noSleep = useRef<NoSleep | null>(null);

  useEffect(() => {
    noSleep.current = new NoSleep();

    return () => {
      noSleep.current?.disable();
    };
  }, []);

  const enableNoSleep = useCallback(() => {
    const handler = () => {
      noSleep.current?.enable();
      // Remove the event listener once activated
      document.removeEventListener("click", handler, false);
    };
    // Add event listener to the document
    document.addEventListener("click", handler, false);
  }, []);
  const disableNoSleep = useCallback(() => {
    noSleep.current?.enable();
    noSleep.current?.disable();
  }, []);

  return { enableNoSleep, disableNoSleep };
}

export default useNoSleep;
