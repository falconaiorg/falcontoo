"use client";
import { useState, useEffect } from "react";
import UAParser from "ua-parser-js";

export const useUserAgent = () => {
  const [userAgentInfo, setUserAgentInfo] = useState<UAParser.IResult | null>(
    null,
  );
  const [isChrome, setIsChrome] = useState<boolean>(false);
  const [isPWA, setIsPWA] = useState<boolean>(false);

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    setUserAgentInfo(result);

    // Check if the browser is Chrome by Google
    if (result.browser.name === "Chrome") {
      setIsChrome(true);
    }

    // Check if the app is running as a PWA
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;
    setIsPWA(isStandalone);
  }, []);

  return { userAgentInfo, isChrome, isPWA };
};

