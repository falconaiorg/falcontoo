import { NodeHtmlMarkdown } from "node-html-markdown";
import TurndownService from "turndown";

// NOTE This will not work without adding turndown to external packages in next webpack config
export const htmlToMarkdownWithTurndown = (html: string) => {
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(html);
  return markdown;
};

export const htmlToMarkdown = (html: string) => {
  const converter = new NodeHtmlMarkdown();
  const markdown = converter.translate(html);
  return markdown;
};
