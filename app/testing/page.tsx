"use client";
import { TestOverflow } from "@/components/ui/test/test-overflow";
import { AnnotationDrawer } from "../(reader)/components/drawer/annotation-drawer";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { hasSelectionAtom } from "../(reader)/components/drawer/atoms";

const aiText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi.";

export default function TestingPage() {
  const hasSelection = useAtomValue(hasSelectionAtom);

  return (
    <div
      className={cn({
        "select-none": hasSelection,
      })}
    >
      {aiText}
      <AnnotationDrawer />
    </div>
  );
}
