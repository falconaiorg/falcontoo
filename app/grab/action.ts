"use server";
import Parser from "@postlight/parser";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";

export async function fetchArticle(url: string | undefined) {
  if (!url) {
    return;
  }
  let result = await Parser.parse(url);
  let content = result.content;
  const converter = new NodeHtmlMarkdown();
  const markdown = converter.translate(content);
  return markdown;
}
