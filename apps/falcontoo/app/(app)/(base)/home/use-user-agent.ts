"use client";
import { useState, useEffect } from "react";
import UAParser from "ua-parser-js";
// Extend the Navigator interface
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}
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

    // Determine if the app is running as a PWA
    let displayMode = "browser";
    const mqStandAlone = "(display-mode: standalone)";
    if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
      displayMode = "standalone";
    }
    setIsPWA(displayMode === "standalone");
  }, []);

  return { userAgentInfo, isChrome, isPWA };
};
