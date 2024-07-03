"use server";
import { Readability } from "@mozilla/readability";
import { htmlParser } from "./html";
import { htmlToMarkdownWithTurndown } from "./markdown";
import { parseUrl } from "./url";
import jsdom from "jsdom";
import { TRPCError } from "@trpc/server";
import { createChecksum } from "./checksum";
import { ArticleWithContent, ParsedArticle } from "./types";

export const parseArticle = async function ({ url }: { url: URL }) {
  //console.log(`Parsing article: ${url.href}`);

  // const html = await htmlParser.serverless({ url });
  const html = await htmlParser.onServer({ url });

  //console.log(`Parsed article: ${html}`);

  //console.log(`Parsed article: ${url.href}`);

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
      url: url.href,
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
  const articleObject: ArticleWithContent = {
    title,
    description,
    author,
    markdown: markdown,
    readablityHtml: html,
    thumbnail,
    url: url.href,
    publishedAt,
    markdownChecksum: createChecksum(markdown),
  };

  return articleObject;
};
