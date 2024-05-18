import { NodeHtmlMarkdown } from "node-html-markdown";
import TurndownService from "turndown";

const turndownService = new TurndownService();

export const htmlToMarkdownWithTurndown = (html: string) => {
  const markdown = turndownService.turndown(html);
  return markdown;
};

export const htmlToMarkdown = (html: string) => {
  const converter = new NodeHtmlMarkdown();
  const markdown = converter.translate(html);
  return markdown;
};
