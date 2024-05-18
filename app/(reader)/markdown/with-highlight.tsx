"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import Highlighter from "react-highlight-words";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useAtom } from "jotai";
import { filterAtom } from "@/lib/state/app";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Highlight = ({ children }: any) => {
  const [animationParent] = useAutoAnimate();

  const [open, setOpen] = React.useState(false);
  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger
        className="underline decoration-teal-800"
        onClick={() => setOpen(!open)}
        onScroll={() => setOpen(false)}
      >
        <span ref={animationParent}>{children}</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <CardHeader>Logical Fallacy</CardHeader>
        <CardContent>
          A logical fallacy is an error in reasoning that renders an argument
          invalid. It is a flaw in an argument that makes the argument unsound.
          Fallacies can be either illegitimate arguments or irrelevant points,
          and are often identified because they lack evidence that supports
          their claim.
        </CardContent>
      </HoverCardContent>
    </HoverCard>
  );
};

const extractText = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  } else if (Array.isArray(children)) {
    return children.map(extractText).join("");
  } else if (children && typeof children === "object" && "props" in children) {
    return extractText((children as React.ReactElement).props.children);
  }
  return "";
};

const MarkdownWithHighlight = ({
  markdownText,
  searchWords,
}: {
  markdownText: string;
  searchWords?: string[];
}) => {
  const [hasFilter] = useAtom(filterAtom);

  return (
    <div>
      <ReactMarkdown
        components={{
          p: ({ node, children }) => {
            const textToHighlight = extractText(children);
            if (!hasFilter || !searchWords || searchWords.length === 0) {
              return <p>{children}</p>;
            }
            return (
              <Highlighter
                highlightClassName="bg-yellow-200"
                searchWords={searchWords}
                autoEscape={true}
                textToHighlight={textToHighlight}
                highlightTag={Highlight}
              />
            );
          },
          // Add more component mappings as needed
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownWithHighlight;
