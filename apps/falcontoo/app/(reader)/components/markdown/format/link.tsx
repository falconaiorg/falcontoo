import Link from "next/link";
import { FormatReturn, FormattingArgs } from "./types";

export const formatLinks = ({
  node,
  children,
  className,
  ...props
}: FormattingArgs): FormatReturn => {
  const href = node?.properties?.href as string;
  return (
    <Link href={href} className="underline decoration-teal-400" {...props}>
      {children}
    </Link>
  );
};
