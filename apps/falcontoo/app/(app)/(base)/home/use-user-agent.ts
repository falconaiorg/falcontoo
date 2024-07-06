"use client";
import { useState, useEffect } from "react";
import UAParser from "ua-parser-js";

const useUserAgent = () => {
  const [userAgentInfo, setUserAgentInfo] = useState<UAParser.IResult | null>(
    null,
  );
  const [isChrome, setIsChrome] = useState<boolean>(false);

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    setUserAgentInfo(result);

    // Check if the browser is Chrome by Google
    if (result.browser.name === "Chrome") {
      setIsChrome(true);
    }
  }, []);

  return { userAgentInfo, isChrome };
};

export default useUserAgent;
