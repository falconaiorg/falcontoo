import { config as browserConfig } from "./browser-config";
// import { puppeteer } from "./with-plugins";
import chromium from "@sparticuz/chromium";

import puppeteer from "puppeteer-extra";

const content = "dog";

export const parseWebpage = async ({ url }: { url: URL }) => {
  const href = url.href;
  const executablePath = await chromium.executablePath();
  console.log(`Parsing webpage: ${href}`);
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: chromium.defaultViewport,
    executablePath: executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  console.log(`Browser launched: ${href}`);
  const page = await browser.newPage();
  await page.goto(href);
  const title = await page.title();
  const content = await page.content();
  await browser.close();
  return content;
};

/**
 *   console.log(`Parsing webpage: ${url.href}`);
  const executablePath = await chromium.executablePath();
  // "/opt/nodejs/node_modules/@sparticuz/chromium/bin",
 * {
    args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: chromium.defaultViewport,
    executablePath: executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  }
 */
