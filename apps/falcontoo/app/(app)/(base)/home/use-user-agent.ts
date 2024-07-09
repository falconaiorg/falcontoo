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
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isPWA, setIsPWA] = useState<boolean>(false);

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    setUserAgentInfo(result);

    // Check if the browser is Chrome by Google
    if (result.browser.name === "Chrome") {
      setIsChrome(true);
    }

    // Check if the OS is iOS
    if (result.os.name === "iOS") {
      setIsIOS(true);
    }

    // Function to check if the app is running as a PWA
    const checkIsPWA = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)",
      ).matches;
      const isFullscreen = window.matchMedia(
        "(display-mode: fullscreen)",
      ).matches;
      const isMinimalUi = window.matchMedia(
        "(display-mode: minimal-ui)",
      ).matches;
      const isIosPwa = window.navigator.standalone;

      const isPWA = isStandalone || isFullscreen || isMinimalUi || isIosPwa;
      return !!isPWA;
    };

    // Set initial PWA state
    setIsPWA(checkIsPWA());

    // Add event listener for changes in display mode
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleChange = (e: MediaQueryListEvent) => setIsPWA(checkIsPWA());

    // Use addEventListener instead of addListener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup function
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { userAgentInfo, isChrome, isPWA, isIOS };
};
