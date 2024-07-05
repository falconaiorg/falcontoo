import { readerFonts as fonts } from "./reader-fonts";
import { ReaderIcons } from "@/components/icons/svg-icons";

const colors = [
  {
    name: "sepia",
    icon_hex: "#fbefd8",
    background_hex: "#e7dec7",
    text_hex: "#ACACAC",
    background_tailwind: "bg-yellow-500",
    text_tailwind: "text-yellow-500",
  },
  {
    name: "dark",
    icon_hex: "#1a1b1e",
    background_hex: "#1a1b1e",
    text_hex: "#FFFFFF",
    background_tailwind: "bg-gray-900",
    text_tailwind: "text-white",
  },
  {
    name: "light",
    icon_hex: "#FFFFFF",
    background_hex: "#FFFFFF",
    text_hex: "#000000",
    background_tailwind: "bg-white",
    text_tailwind: "text-black",
  },
  {
    name: "green",
    icon_hex: "#c5e7ce",
    background_hex: "#c5e7ce",
    text_hex: "#000000",
    background_tailwind: "bg-green-500",
    text_tailwind: "text-slate-500",
  },
];

const margins = [
  { size: "small", className: "mx-0.5", Icon: ReaderIcons.margin.small },
  { size: "medium", className: "mx-2", Icon: ReaderIcons.margin.medium },
  { size: "large", className: "mx-6", Icon: ReaderIcons.margin.large },
];

const lineHeights = [
  {
    size: "small",
    className: "prose-p:leading-normal",
    Icon: ReaderIcons.leading.small,
  },
  {
    size: "medium",
    className: "prose-p:leading-relaxed",
    Icon: ReaderIcons.leading.medium,
  },
  {
    size: "large",
    className: "prose-p:leading-loose",
    Icon: ReaderIcons.leading.large,
  },
];

const alignments = [
  {
    alignment: "left",
    className: "text-left",
    Icon: ReaderIcons.alignment.left,
  },
  {
    alignment: "justify",
    className: "text-justify",
    Icon: ReaderIcons.alignment.justify,
  },
];

// Save the size value and not the value itself in the database
const fontSizes = [
  { size: 1, className: "prose-sm" },
  { size: 2, className: "prose-base" },
  { size: 3, className: "prose-lg" },
  { size: 4, className: "prose-xl" },
  { size: 5, className: "prose-2xl" },
];
const themes = [
  { name: "light", color: "bg-white" },
  { name: "dark", color: "bg-black" },
];

export const STYLES = {
  colors,
  fonts,
  margins,
  lineHeights,
  alignments,
  fontSizes,
  themes,
};
