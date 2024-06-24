"use client";
import { useAtomValue } from "jotai";
import { hasSelectionAtom } from "../../components/drawer/atoms";
import MarkdownWithHighlight from "../../components/markdown/with-highlight";

export function Content({
  content,
  searchWords,
}: {
  content: string;
  searchWords: string[];
}) {
  const hasSelection = useAtomValue(hasSelectionAtom);

  return (
    <div key={hasSelection ? "base" : "swapped"}>
      <MarkdownWithHighlight markdownText={content} searchWords={searchWords} />
    </div>
  );
}
