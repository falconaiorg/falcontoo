export const BROWSER_CONFIG = {
  BROWSER_ARGS: [
    "--no-sandbox",
    "--enable-features=SharedArrayBuffer",
    "--disable-setuid-sandbox",
    "--allow-running-insecure-content",
    "--autoplay-policy=user-gesture-required",
    "--disable-component-update",
    "--disable-domain-reliability",
    "--disable-features=AudioServiceOutOfProcess,IsolateOrigins,site-per-process",
    "--disable-print-preview",
    "--disable-site-isolation-trials",
    "--disable-web-security",
    "--disk-cache-size=33554432",
    "--hide-scrollbars",
    "--disable-gpu",
    "--mute-audio",
    "--no-default-browser-check",
    "--no-pings",
    "--no-sandbox",
    "--no-zygote",
    "--disable-extensions",
  ],
  EXECUTABLE_PATH:
    process.env.NODE_ENV === "development"
      ? undefined
      : process.env.CHROME_BIN || "/usr/bin/chromium",
  IS_HEADLESS: true,
};
