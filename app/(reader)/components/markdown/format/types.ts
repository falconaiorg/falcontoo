import { ElementContent } from "react-markdown/lib";
import { Element } from "react-markdown/lib";

export type TextElementContent = ElementContent & {
  value: string;
};

export type FormattingArgs = {
  node: Element | undefined;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export type FormatReturn = React.ReactElement | null;
