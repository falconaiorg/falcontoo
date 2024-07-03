import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import BlockResourcesPlugin from "puppeteer-extra-plugin-block-resources";

type BlockedType =
  | "document"
  | "stylesheet"
  | "image"
  | "media"
  | "font"
  | "script"
  | "texttrack"
  | "xhr"
  | "fetch"
  | "prefetch"
  | "eventsource"
  | "websocket"
  | "manifest"
  | "signedexchange"
  | "ping"
  | "cspviolationreport"
  | "preflight"
  | "other";

puppeteer.use(StealthPlugin());
puppeteer.use(
  AdblockerPlugin({
    blockTrackers: true,
  })
);
puppeteer.use(
  BlockResourcesPlugin({
    blockedTypes: new Set<BlockedType>(["font"]),
  })
);

export const parseWebpage = async ({ url }: { url: URL }) => {
  const href = url.href;
  const browser = await puppeteer.launch({
    headless: true,
    args: [
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
    
  });
  //console.log(`Browser launched: ${href}`);
  const page = await browser.newPage();
  await page.goto(href);
  const title = await page.title();
  const content = await page.content();
  await browser.close();
  return content;
};
