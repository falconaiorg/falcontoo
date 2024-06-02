"use client";
import { useAtom } from "jotai";
import { filterAtom } from "@falcon/lib/state/app";
import { format } from "./format";
import { MemoizedReactMarkdown } from "@/components/markdown-parser/markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { cn } from "@/lib/utils";

const MarkdownWithHighlight = ({
  markdownText,
  searchWords,
}: {
  markdownText: string;
  searchWords?: string[];
}) => {
  const [hasFilter] = useAtom(filterAtom);
  const hasHighlight = !!(hasFilter && searchWords && searchWords.length > 0);

  return (
    <MemoizedReactMarkdown
      className={cn(
        "prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0",
      )}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ node, children, className, ...props }) =>
          format.paragraph({
            node,
            children,
            className,
            hasHighlight,
            ...props,
          }),
        a: ({ node, children, className, ...props }) =>
          format.link({ node, children, className, ...props }),
        table: ({ node, children, className, ...props }) =>
          format.table({ node, children, className, ...props }),
        blockquote: ({ node, children, className, ...props }) =>
          format.blockquote({ node, children, className, ...props }),
        strong: ({ node, children, className, ...props }) =>
          format.bold({ node, children, className, ...props }),
        ul: ({ node, children, className, ...props }) =>
          format.list({ node, children, className, ...props }),
        ol: ({ node, children, className, ...props }) =>
          format.list({ node, children, className, ...props }),
        code: ({ node, className, children, ...props }) =>
          format.code({ node, className, children, ...props }),
        img: ({ node, className, children, src, alt, ...props }) =>
          format.image({ node, className, children, src, alt, ...props }),
      }}
    >
      {markdownText}
    </MemoizedReactMarkdown>
  );
};

export default MarkdownWithHighlight;
