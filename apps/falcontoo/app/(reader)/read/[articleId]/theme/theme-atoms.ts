import { atom } from "jotai";
import { STYLES } from "./config";
import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage("theme", STYLES.themes[0]);

export const colorAtom = atomWithStorage("color", STYLES.colors[0]);

export const lineHeightAtom = atomWithStorage(
  "lineHeight",
  STYLES.lineHeights[0],
);

export const fontSizeAtom = atomWithStorage(" fontSize", STYLES.fontSizes[1]);

export const alignmentAtom = atomWithStorage("alignment", STYLES.alignments[0]);

export const marginAtom = atomWithStorage("margin", STYLES.margins[0]);

export const fontAtom = atomWithStorage("font", STYLES.fonts[0]);
