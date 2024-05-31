import { NodeHtmlMarkdown } from "node-html-markdown";
import TurndownService from "turndown";

// NOTE This will not work without adding turndown to external packages in next webpack config
export const htmlToMarkdownWithTurndown = (html: string) => {
  const turndownService = new TurndownService();

  // const turndownServicewithRule = turndownService.addRule("imageLink", {
  //   filter: (node: Node) => {
  //     return (
  //       node.nodeName === "A" &&
  //       node.firstChild !== null &&
  //       node.firstChild.nodeName === "IMG"
  //     );
  //   },
  //   replacement: (content: string, node: Node) => {
  //     if (node instanceof HTMLAnchorElement) {
  //       const imgNode = node.firstChild as HTMLImageElement | null;
  //       if (imgNode) {
  //         const alt = imgNode.alt || "";
  //         const src = imgNode.getAttribute("src") || "";
  //         const href = node.getAttribute("href") || "";
  //         return `[![${alt}](${src})](${href})`;
  //       }
  //     }
  //     return "";
  //   },
  // });

  const markdown = turndownService.turndown(html);
  return markdown;
};

export const htmlToMarkdown = (html: string) => {
  const converter = new NodeHtmlMarkdown();
  const markdown = converter.translate(html);
  return markdown;
};
