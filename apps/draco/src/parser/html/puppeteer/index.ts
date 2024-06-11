import { puppeteerWithPlugins } from "./config/plugin-config";
import { Browser, Page } from "puppeteer";
import { BROWSER_CONFIG } from "./config/browser-config";
const { BROWSER_ARGS, EXECUTABLE_PATH, IS_HEADLESS } = BROWSER_CONFIG;

let browser: Browser;

const handleDisconnection = async () => {
  console.log("Browser disconnected, reconnecting...");
  try {
    const childProcess = browser.process();
    if (childProcess) {
      childProcess.kill("SIGINT");
    }
    await startBrowser();
  } catch (error) {
    console.error("Error restarting browser:", error);
  }
};

const startBrowser = async () => {
  try {
    console.log(`Executable path: ${EXECUTABLE_PATH}`);
    browser = (await puppeteerWithPlugins.launch({
      headless: IS_HEADLESS,
      executablePath: EXECUTABLE_PATH,
      args: BROWSER_ARGS,
    })) as Browser;
    console.log(`Browser launched`);
    browser.on("disconnected", handleDisconnection);
  } catch (error) {
    console.error(`Failed to start browser: ${error}`);
  }
};

// Start the browser on server start
(async () => await startBrowser())();

// Main Function
export const parseWebpage = async ({ url }: { url: URL }): Promise<string> => {
  const href = url.href;
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    await page.goto(href, { waitUntil: "domcontentloaded" });
    const title = await page.title();
    const content = await page.content();
    console.log(`Page title: ${title}`);
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
