import { parseWebpage as serverParser } from "./puppeteer/server";
import { parseWebpage as serverlessParser } from "./puppeteer/serverless";

export const htmlParser = {
  serverless: serverlessParser,
  onServer: serverParser,
};

// import { Readability, isProbablyReaderable } from "@mozilla/readability";
// import { TRPCError } from "@trpc/server";
// import jsdom from "jsdom";
// import { htmlToMarkdownWithTurndown } from "../markdown";
// import { ParsedArticle } from "../types";
// import { createChecksum } from "../checksum";
// import Parser from "@postlight/parser";

// export const parseWithReadability = async (
//   url: string,
// ): Promise<ParsedArticle> => {
//   const article = await fetch(url);
//   const html = await article.text();

//   const doc = new jsdom.JSDOM(html, {
//     url: url,
//   });
// //   //console.log(isProbablyReaderable(doc.window.document));
// //   if (!isProbablyReaderable(doc.window.document)) {
// //     throw new TRPCError({
// //       code: "UNPROCESSABLE_CONTENT",
// //       message: "This article is not readable. We are working on it.",
// //       cause: new Error(`Parser Readability failed to parse the content`),
// //     });
// //   }
//   const reader = new Readability(doc.window.document);
//   const articleWithReadability = reader.parse();
//   if (!articleWithReadability) {
//     throw new TRPCError({
//       code: "UNPROCESSABLE_CONTENT",
//       message: "This article is not readable. We are working on it.",
//       cause: new Error(`Parser Readability failed to parse the content`),
//     });
//   }
//   const content = articleWithReadability?.content;
//   const markdown = htmlToMarkdownWithTurndown(content);
//   const contentToReturn: ParsedArticle = {
//     title: articleWithReadability.title,
//     description: articleWithReadability.excerpt,
//     author: articleWithReadability?.byline || "unknown",
//     content: markdown,
//     rawHTML: content,
//     thumbnail: articleWithReadability.siteName,
//     url: url,
//     publishedAt: new Date(articleWithReadability.publishedTime),
//     rawChecksum: createChecksum(content),
//     parsedChecksum: createChecksum(markdown),
//   };
//   return contentToReturn;
// };

// export const parseWithPostlight = async (
//   url: string,
// ): Promise<ParsedArticle> => {
//   try {
//     const result = await Parser.parse(url);
//     const content = result.content;
//     if (!content) {
//       throw new TRPCError({
//         code: "UNPROCESSABLE_CONTENT",
//         message: "This article is not readable. We are working on it.",
//         cause: new Error(`Postlight failed to parse the content`),
//       });
//     }
//     const markdown = htmlToMarkdownWithTurndown(content);
//     const contentToReturn: ParsedArticle = {
//       title: result.title,
//       description: result.excerpt,
//       author: result.author,
//       content: markdown,
//       rawHTML: content,
//       thumbnail: result.lead_image_url,
//       url: url,
//       publishedAt: new Date(result.date_published),
//       rawChecksum: createChecksum(result.content),
//       parsedChecksum: createChecksum(markdown),
//     };
//     return contentToReturn;
//   } catch (err) {
//     throw new TRPCError({
//       code: "UNPROCESSABLE_CONTENT",
//       message: "This article is not readable. We are working on it.",
//       cause: new Error(`Postlight failed to parse the content`),
//     });
//   }
// };
