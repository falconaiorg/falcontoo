import { formatCode } from "./code";
import { formatParagraph } from "./paragraph";
import { FormatReturn, FormattingArgs } from "./types";
import { formatLinks } from "./link";

export const formatLists = ({
  node,
  children,
  className,
  ...props
}: FormattingArgs): FormatReturn => {
  if (node?.tagName === "ul") {
    return (
      <ul className="list-inside list-disc" {...props}>
        {children}
      </ul>
    );
  } else {
    return (
      <ol className="list-inside list-decimal text-green-300" {...props}>
        {children}
      </ol>
    );
  }
};

export const formatBlockquote = ({
  node,
  children,
  className,
  ...props
}: FormattingArgs): FormatReturn => {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
      {children}
    </blockquote>
  );
};

const formatImage = ({
  node,
  src,
  alt,
}: FormattingArgs & {
  src: string | undefined;
  alt: string | undefined;
}): FormatReturn => {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src} // Error here
      alt={alt}
      className="mx-auto my-4 rounded"
      style={{ maxWidth: "100%" }}
    />
  );
};

export const formatTable = ({
  node,
  children,
  className,
  ...props
}: FormattingArgs): FormatReturn => {
  return <table className="w-full table-auto" {...props}></table>;
};

export const formatBold = ({
  node,
  children,
  className,
  ...props
}: FormattingArgs): FormatReturn => {
  return (
    <span className="text-blue-600" {...props}>
      {children}
    </span>
  );
};

export const format = {
  code: formatCode,
  paragraph: formatParagraph,
  link: formatLinks,
  list: formatLists,
  blockquote: formatBlockquote,
  table: formatTable,
  bold: formatBold,
  image: formatImage,
};
