"use client";
import { useAtom } from "jotai";
import { filterAtom } from "@falcon/lib/state/app";
import { format } from "./format";
import { MemoizedReactMarkdown } from "@/components/markdown-parser/markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { cn } from "@/lib/utils";
import { testMarkdown } from "./testMarkdown";
import {
  alignmentAtom,
  fontAtom,
  fontSizeAtom,
  lineHeightAtom,
  marginAtom,
} from "../../read/[articleId]/theme/theme-atoms";

export const MarkdownWithHighlightNew = ({
  markdownText,
  searchWords,
}: {
  markdownText: string;
  searchWords?: string[];
}) => {
  console.log("markdownText", markdownText);
  const [hasFilter] = useAtom(filterAtom);
  const hasHighlight = !!(hasFilter && searchWords && searchWords.length > 0);
  const [lineHeight] = useAtom(lineHeightAtom);
  const [fontSize] = useAtom(fontSizeAtom);
  const [alignment] = useAtom(alignmentAtom);
  const [margin] = useAtom(marginAtom);
  const [font] = useAtom(fontAtom);
  console.log("lineHeight", lineHeight);

  return (
    <MemoizedReactMarkdown
      className={cn(
        alignment.className,
        margin.className,
        lineHeight.className,
        fontSize.className,
        font.className,
        "break-words scrollbar-thin",
        "prose",
        "dark:prose-invert",
        "prose-a:underline prose-a:decoration-teal-400",
        "prose-ul:list-inside prose-ul:list-disc",
        "prose-ol:list-inside prose-ol:list-decimal",
        "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs",
        "prose-img:mx-auto prose-img:my-4 prose-img:max-w-full prose-img:rounded",
        "prose-strong: prose-strong:text-blue-600",
        "prose-table:w-full prose-table:table-auto",
        "prose-pre:p-0",
        "prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600",
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
        code: ({ node, className, children, ...props }) =>
          format.code({ node, className, children, ...props }),
      }}
    >
      {markdownText}

      {/* {"new markdown text \n\n " + testMarkdown} */}
    </MemoizedReactMarkdown>
  );
};
