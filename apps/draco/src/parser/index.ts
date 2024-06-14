"use server";
import { Readability } from "@mozilla/readability";
import { htmlParser } from "./html";
import { htmlToMarkdownWithTurndown } from "./markdown";
import jsdom from "jsdom";
import { TRPCError } from "@trpc/server";
import { createChecksum } from "./checksum";
import { ArticleWithContent, ParsedArticle } from "./types";

export const parseArticle = async function ({ url }: { url: URL }) {
  console.log(`Parsing article: ${url.href}`);

  // const html = await htmlParser.serverless({ url });
  const html = await htmlParser.onServer({ url });

  console.log(`Parsed article: ${html}`);

  console.log(`Parsed article: ${url.href}`);

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
    console.log("Parsing article with JSDOM");
    doc = new jsdom.JSDOM(html, {
      url: url.href,
    });
    console.log("Parsed article with JSDOM");
  } catch (err) {
    console.error("Error at JSDOM parser", err);
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "1: Error at JSDOM parser",
      cause: err,
    });
  }
  try {
    console.log("Creating Readability instance");
    reader = new Readability(doc.window.document);
    console.log("Created Readability instance");
  } catch (err) {
    console.error("Error at Readability construction", err);
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "2: Error at Readability construction",
      cause: err,
    });
  }
  try {
    console.log("Parsing article with Readability");
    articleWithReadability = reader.parse();
    console.log("Parsed article with Readability");
    if (!articleWithReadability) {
      console.error("No article with readability");
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "3: No article with readability",
        cause: new Error(`Parser Readability failed to parse the content`),
      });
    }
    console.log("Article with readability", articleWithReadability);
    title = articleWithReadability?.title;
    description = articleWithReadability?.excerpt;
    author = articleWithReadability?.byline || "unknown";
    thumbnail = articleWithReadability?.siteName;
    publishedAt = new Date(articleWithReadability?.publishedTime);
    console.log("Title", title);
    console.log("Description", description);
    console.log("Author", author);
    console.log("Thumbnail", thumbnail);
    console.log("Published At", publishedAt);
  } catch (err) {
    console.error("Error at Readability parser", err);
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "4: Error at Readability parser",
      cause: err,
    });
  }
  try {
    console.log("Converting HTML to Markdown");
    markdown = htmlToMarkdownWithTurndown(articleWithReadability.content);
  } catch (err) {
    console.error("Error at markdown conversion", err);
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
  console.log(`Parsed article: ${url.href}`);

  return articleObject;
};
