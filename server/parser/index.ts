"use server";
import { Readability } from "@mozilla/readability";
import { parseWebpage } from "./html/puppeteer";
import { htmlToMarkdownWithTurndown } from "./markdown";
import { parseUrl } from "./url";
import jsdom from "jsdom";
import { TRPCError } from "@trpc/server";
import { createChecksum } from "./checksum";
import { ParsedArticle } from "./types";

export const parseArticle = async function ({ url }: { url: string }) {
  const parsedUrl = await parseUrl({ url: url });
  const html = await parseWebpage({ url: parsedUrl });
  let doc,
    reader: Readability<string>,
    articleWithReadability: ReturnType<Readability<string>["parse"]>,
    markdown,
    title,
    description,
    author,
    thumbnail,
    publishedAt;

  try {
    doc = new jsdom.JSDOM(html, {
      url: parsedUrl.href,
    });
  } catch (err) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "1: Error at JSDOM parser",
      cause: err,
    });
  }
  try {
    reader = new Readability(doc.window.document);
  } catch (err) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "2: Error at Readability construction",
      cause: err,
    });
  }
  try {
    articleWithReadability = reader.parse();
    if (!articleWithReadability) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "3: No article with readability",
        cause: new Error(`Parser Readability failed to parse the content`),
      });
    }
    title = articleWithReadability?.title;
    description = articleWithReadability?.excerpt;
    author = articleWithReadability?.byline || "unknown";
    thumbnail = articleWithReadability?.siteName;
    publishedAt = new Date(articleWithReadability?.publishedTime);
  } catch (err) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "4: Error at Readability parser",
      cause: err,
    });
  }
  try {
    markdown = htmlToMarkdownWithTurndown(articleWithReadability.content);
  } catch (err) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "5: Error at markdown conversion",
      cause: err,
    });
  }
  const articleObject: ParsedArticle = {
    title,
    description,
    author,
    content: markdown,
    rawHTML: html,
    thumbnail,
    url,
    publishedAt,
    rawChecksum: createChecksum(html),
    parsedChecksum: createChecksum(markdown),
  };

  return articleObject;
};
