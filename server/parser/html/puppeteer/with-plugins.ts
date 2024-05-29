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

require("puppeteer-extra-plugin-stealth/evasions/chrome.app");
require("puppeteer-extra-plugin-stealth/evasions/chrome.csi");
require("puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes");
require("puppeteer-extra-plugin-stealth/evasions/chrome.runtime");
require("puppeteer-extra-plugin-stealth/evasions/defaultArgs"); // pkg warned me this one was missing
require("puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow");
require("puppeteer-extra-plugin-stealth/evasions/media.codecs");
require("puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency");
require("puppeteer-extra-plugin-stealth/evasions/navigator.languages");
require("puppeteer-extra-plugin-stealth/evasions/navigator.permissions");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins");
require("puppeteer-extra-plugin-stealth/evasions/navigator.vendor");
require("puppeteer-extra-plugin-stealth/evasions/navigator.webdriver");
require("puppeteer-extra-plugin-stealth/evasions/sourceurl");
require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
require("puppeteer-extra-plugin-stealth/evasions/webgl.vendor");
require("puppeteer-extra-plugin-stealth/evasions/window.outerdimensions");

puppeteer.use(StealthPlugin());
puppeteer.use(
  AdblockerPlugin({
    blockTrackers: true,
  }),
);
// puppeteer.use(
//   BlockResourcesPlugin({
//     blockedTypes: new Set<BlockedType>(["font"]),
//   }),
// );

export { puppeteer };
