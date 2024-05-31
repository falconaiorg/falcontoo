import Highlighter from "react-highlight-words";
import { FormatReturn, FormattingArgs } from "./types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";

export const extractText = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  } else if (Array.isArray(children)) {
    return children.map(extractText).join("");
  } else if (children && typeof children === "object" && "props" in children) {
    return extractText((children as React.ReactElement).props.children);
  }
  return "";
};

export const formatParagraph = ({
  node,
  children,
  className,
  hasHighlight,
  ...props
}: FormattingArgs & { hasHighlight: boolean }): FormatReturn => {
  if (!hasHighlight) {
    return <p className={`mb-2 last:mb-0`}>{children}</p>;
  }
  const textToHighlight = extractText(children);

  // Formatting does not work with the Highlighter component
  return (
    // Do not remove the p tag, the Highlighter component applies the span to highlight and that is not formatted by tailwind prose
    <p className={`mb-2 last:mb-0`}>
      <Highlighter
        searchWords={["Y Combinator"]}
        autoEscape={true}
        textToHighlight={textToHighlight}
        highlightTag={Highlight}
        {...props}
      />
    </p>
  );
};

const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const [animationParent] = useAutoAnimate();
  const [open, setOpen] = React.useState(false);
  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger
        className=" underline decoration-teal-300 decoration-2"
        onClick={() => setOpen(!open)}
        onScroll={() => setOpen(false)}
      >
        <span ref={animationParent} className="inline">
          {children}
        </span>
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
