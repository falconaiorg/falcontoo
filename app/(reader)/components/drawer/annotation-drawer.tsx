"use client";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useTextSelection } from "./use-text-selection";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { DrawerCarousel } from "./drawer-carousel";
import { ChatSpace } from "./chat-space";

const SNAP_POINT = {
  initial: 0.4,
  final: 0.85,
} as const;
const aiText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi.";

export function AnonotationDrawer() {
  const { ref, inView } = useInView({
    threshold: 0.5, // Adjust the threshold as needed
  });

  const [activeSnapPoint, setActiveSnapPoint] = useState<
    string | number | null
  >(0);

  const {
    text,
    selection,
    range,
    clearSelection,
    position,
    hasSelection,
    setHasSelectionChange,
  } = useTextSelection();

  console.log("selection", text);

  const fullyOpened = activeSnapPoint === SNAP_POINT.final;

  return (
    <Drawer
      onOpenChange={(open) => {
        console.log("open", open);
        setHasSelectionChange(open);
      }}
      open={hasSelection}
      snapPoints={[SNAP_POINT.initial, SNAP_POINT.final]}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={setActiveSnapPoint}
    >
      <DrawerContent
        className={cn("flex flex-col items-center space-y-2", {
          " overflow-y-auto scrollbar-thin":
            activeSnapPoint === SNAP_POINT.final,
        })}
      >
        <DrawerHeader className="flex flex-row justify-center">
          <Card className="w-3/4 border-none p-4">
            <span className="line-clamp-2 font-serif text-sm font-thin text-muted-foreground">
              {text}
            </span>
          </Card>
        </DrawerHeader>
        <Card>
          <CardContent className="aspect-square flex items-center justify-center p-6">
            {aiText}
          </CardContent>
        </Card>
        <DrawerCarousel
          content={[aiText, aiText + aiText + aiText]}
          hideArrows={inView}
        />
        <div ref={ref}>
          <ChatSpace />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
