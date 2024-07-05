"use client";
import { ChevronUpIcon, ChevronDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArticleCredibility } from "./analysis";
import { fonts } from "@falcon/lib/fonts";
import { Analysis } from "@falcon/lib/ai/context/analysis/generate-analysis";
import { Styler } from "../theme/styler";
import { Separator } from "@/components/ui/separator";

export function ContextContent({
  context,
  analysis,
}: {
  context: string;
  analysis: Analysis;
}) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const expandCard = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [expanded]);

  return (
    <Card className="min-h-42 relative px-2">
      <CardHeader className="flex flex-row items-center justify-between px-2 py-2">
        <h1 className="font-serif font-bold">Analysis</h1>
        <Styler />
      </CardHeader>
      <Separator />
      <div className="py-2">
        {/* <div className={cn("font-serif text-sm", fonts.serif.cardo)}>
          Context
        </div> */}
        <motion.div
          ref={contentRef}
          className={cn("overflow-hidden text-sm")}
          initial={{ height: 60 }}
          animate={{ height: expanded ? "auto" : 60 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <ArticleCredibility analysis={analysis} />
          {/* {context} */}
        </motion.div>
      </div>
      <div className="flex flex-row items-center justify-end">
        {true && ( // contentHeight > 60 Conditionally render based on content height
          <Button
            variant={"ghost"}
            onClick={expandCard}
            size={"sm"}
            className="flex items-center space-x-1 hover:bg-transparent hover:text-inherit"
          >
            {expanded ? (
              <ChevronUpIcon size="xs" />
            ) : (
              <ChevronDownIcon size="xs" />
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}
