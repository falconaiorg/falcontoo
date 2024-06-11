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
    blockedTypes: new Set<BlockedType>([
      "image",
      "stylesheet",
      "media",
      "font",
      "xhr",
      "manifest",
      "websocket",
      "other",
    ]),
  })
);
export { puppeteer as puppeteerWithPlugins };
