"use client";
import { ChevronUpIcon, ChevronDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

export function ContextContent({ context }: { context: string }) {
  const [expanded, setExpanded] = useState(false);

  const expandCard = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="min-h-42 relative bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] ">
      <CardHeader className="py-4">
        <CardTitle className="font-serif text-sm">Pre-reading</CardTitle>
        <motion.div
          className={cn("overflow-hidden text-sm")}
          initial={{ height: 60 }}
          animate={{ height: expanded ? "auto" : 60 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {context}
        </motion.div>
      </CardHeader>
      <div className="flex flex-row items-center justify-end">
        <Button
          variant={"ghost"}
          onClick={expandCard}
          size={"sm"}
          className="flex items-center space-x-1"
        >
          {expanded ? (
            <ChevronUpIcon size="xs" />
          ) : (
            <ChevronDownIcon size="xs" />
          )}
          <div className="font-mono text-xs">
            {expanded ? "Collapse" : "Expand"}
          </div>
        </Button>
      </div>
    </Card>
  );
}
