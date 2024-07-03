// TODO: Check if multiple browser instances are being created in docker
// FIX: Check if browser is disconnected before creating a new browser instance

import { puppeteerWithPlugins } from "./config/plugin-config";
import { Browser, Page } from "puppeteer";
import { BROWSER_CONFIG } from "./config/browser-config";
const { BROWSER_ARGS, EXECUTABLE_PATH, IS_HEADLESS } = BROWSER_CONFIG;

let browser: Browser;

const handleDisconnection = async () => {
  //console.log("Browser disconnected, reconnecting...");
  try {
    const childProcess = browser.process();
    if (childProcess) {
      childProcess.kill("SIGINT");
    }
    if (browser) {
      //console.log("Closing existing browser instance...");
      await browser.close(); // Ensure existing browser is closed
    }
    await startBrowser();
  } catch (error) {
    //console.log("Error restarting browser:", error);
  }
};

const startBrowser = async () => {
  try {
    //console.log(`Executable path: ${EXECUTABLE_PATH}`);
    //console.log(`Headless mode: ${IS_HEADLESS}`);
    browser = (await puppeteerWithPlugins.launch({
      headless: IS_HEADLESS,
      executablePath: EXECUTABLE_PATH,
      args: BROWSER_ARGS,
    })) as Browser;
    //console.log(`Browser launched`);
    browser.on("disconnected", handleDisconnection);
  } catch (error) {
    //console.log(`Failed to start browser: ${error}`);
  }
};

// Start the browser on server start
(async () => await startBrowser())();

const gracefulShutdown = async () => {
  //console.log("Graceful shutdown initiated");
  if (browser) {
    try {
      // // Close all browser contexts
      // const contexts = browser.browserContexts();
      // for (const context of contexts) {
      //   const pages = await context.pages();
      //   for (const page of pages) {
      //     await page.close();
      //   }
      //   await context.close();
      // }
      // // Close the browser
      await browser.close();
      //console.log("Browser closed successfully");
    } catch (error) {
      //console.log("Error closing browser:", error);
    } finally {
      process.exit(0);
    }
  }
  process.exit(0); // Ensure this happens after the above async operations
};

process.on("SIGINT", async () => {
  //console.log("Received SIGINT");
  await gracefulShutdown();
});

process.on("SIGTERM", async () => {
  //console.log("Received SIGTERM");
  await gracefulShutdown();
});

// Main Function
export const parseWebpage = async ({ url }: { url: URL }): Promise<string> => {
  const href = url.href;
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    await page.goto(href, { waitUntil: "domcontentloaded" });
    const title = await page.title();
    const content = await page.content();
    //console.log(`Page title: ${title}`);
    return content;
  } catch (error) {
    console.error(`Failed to parse webpage: ${error}`);
    throw error;
  } finally {
    if (context) {
      await context.close();
    }
  }
};
