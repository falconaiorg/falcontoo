import { CodeBlock } from "@/components/chat/code-block";
import { FormatReturn, FormattingArgs, TextElementContent } from "./types";

export const formatCode = ({
  node,
  className,
  children,
  ...props
}: FormattingArgs): FormatReturn => {
  if (Array.isArray(children) && children.length) {
    if (children[0] === "▍") {
      return <span className="mt-1 animate-pulse cursor-default">▍</span>;
    }
    children[0] = (children[0] as string).replace("`▍`", "▍");
  }
  const match = className ? /language-(\w+)/.exec(className) : null;

  // Check if the parent node is 'pre' to determine if it's a block code
  if (node && node.tagName === "code" && match) {
    let codeValue = "";
    if (
      Array.isArray(node.children) &&
      node.children[0] &&
      (node.children[0] as TextElementContent).value
    ) {
      codeValue = (node.children[0] as TextElementContent).value.replace(
        /\n$/,
        "",
      );
    }

    return (
      <CodeBlock
        key={Math.random()}
        language={match[1]}
        value={codeValue ? codeValue : String(children).replace(/\n$/, "")}
        {...props}
      />
    );
  } else {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
};
