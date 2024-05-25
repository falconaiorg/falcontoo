import { config as browserConfig } from "./browser-config";
import { puppeteer } from "./with-plugins";

const content = "dog";

export const parseWebpage = async ({ url }: { url: URL }) => {
  const href = url.href;
  const browser = await puppeteer.launch(browserConfig);
  const page = await browser.newPage();
  await page.goto(href);
  const title = await page.title();
  const content = await page.content();
  await browser.close();
  return content;
};
