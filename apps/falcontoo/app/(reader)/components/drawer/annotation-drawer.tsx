"use client";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTextSelection } from "./use-text-selection";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { DrawerCarousel } from "./drawer-carousel";
import { ChatSpace } from "./chat-space";
import { useSetAtom } from "jotai";
import { hasSelectionAtom } from "./atoms";
import { Button } from "@/components/ui/button";

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

  const [startChat, setStartChat] = useState(false);

  const [isAnnotationExpanded, setIsAnnotationExpanded] = useState(false);

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
        //console.log("open", open);
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
      <DrawerContent className="mx-auto mt-0 h-[90%] w-[98%]">
        <main className="flex h-full w-full flex-col items-center">
          <DrawerHeader className="flex flex-row justify-center">
            <Card className="relative w-3/4 border-none p-4">
              <span
                onClick={() => {
                  setIsAnnotationExpanded(!isAnnotationExpanded);
                  if (!isAnnotationExpanded) {
                    setActiveSnapPoint(SNAP_POINT.final);
                  }
                }}
                className={cn(
                  "font-serif text-sm font-thin text-muted-foreground",
                  {
                    "line-clamp-none": isAnnotationExpanded,
                    "line-clamp-2": !isAnnotationExpanded,
                  },
                )}
              >
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
              clamp={
                activeSnapPoint == SNAP_POINT.final && startChat ? 5 : undefined
              }
            />
            {/* <DrawerCarousel
              content={[aiText, aiText + aiText + aiText]}
              hideArrows={inView}
            /> */}
            <div ref={ref} className="z-50 w-11/12">
              {startChat && <ChatSpace />}
            </div>
          </div>
          <DrawerFooter>
            <div>
              <Button onClick={() => setStartChat(!startChat)}>
                {startChat ? "Close Chat" : "Start Chat"}
              </Button>
            </div>
          </DrawerFooter>
        </main>
      </DrawerContent>
    </Drawer>
  );
}
