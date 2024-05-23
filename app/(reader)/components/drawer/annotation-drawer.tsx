"use client";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import { useTextSelection } from "./use-text-selection";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { DrawerCarousel } from "./drawer-carousel";
import { ChatSpace } from "./chat-space";
import { TestOverflow } from "@/components/ui/test/test-overflow";
import { useSetAtom } from "jotai";
import { hasSelectionAtom } from "./atoms";

const SNAP_POINT = {
  initial: 0.5,
  final: 1,
} as const;
const aiText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi.";

export function AnnotationDrawer() {
  const { ref, inView } = useInView({
    threshold: 0.5, // Adjust the threshold as needed
  });

  const [activeSnapPoint, setActiveSnapPoint] = useState<
    string | number | null
  >(0.5);
  const setSelectionAtom = useSetAtom(hasSelectionAtom);

  const {
    text,
    selection,
    range,
    clearSelection,
    position,
    hasSelection,
    setHasSelectionChange,
  } = useTextSelection();

  useEffect(() => {
    if (hasSelection) {
      setSelectionAtom(true);
    } else {
      setSelectionAtom(false);
    }
  }, [hasSelection]);

  return (
    <Drawer
      onOpenChange={(open) => {
        console.log("open", open);
        setHasSelectionChange(open);
        if (!open) {
          clearSelection();
        }
      }}
      open={hasSelection}
      snapPoints={[SNAP_POINT.initial, SNAP_POINT.final]}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={setActiveSnapPoint}
    >
      <DrawerContent className="mt-0 h-[90%] w-[98%] mx-auto">
        <main className="flex h-full w-full flex-col items-center">
          <DrawerHeader className="flex flex-row justify-center">
            <Card className="w-3/4 border-none p-4">
              <span className="line-clamp-2 font-serif text-sm font-thin text-muted-foreground">
                {text}
              </span>
            </Card>
          </DrawerHeader>
          <div
            className={cn("flex h-5/6 flex-col items-center space-y-3 pb-10", {
              "overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-background scrollbar-thumb-gray-800":
                activeSnapPoint === SNAP_POINT.final,
            })}
          >
            <DrawerCarousel
              content={[aiText, aiText + aiText + aiText]}
              hideArrows={inView}
            />
            <DrawerCarousel
              content={[aiText, aiText + aiText + aiText]}
              hideArrows={inView}
            />
            <div ref={ref} className="z-50 w-11/12">
              <ChatSpace />
            </div>
          </div>
          <DrawerFooter>Chat Input</DrawerFooter>
        </main>
      </DrawerContent>
    </Drawer>
  );
}
