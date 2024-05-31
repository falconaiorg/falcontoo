"use client";
import { LightningBoltIcon } from "@radix-ui/react-icons";

import { Toggle } from "@/components/ui/toggle";
import useNoSleep from "@/hooks/use-no-sleep";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function NoSleepToggle() {
  const { enableNoSleep, disableNoSleep } = useNoSleep();
  const [pressedState, setPressedState] = useState(false);

  return (
    <Toggle
      pressed={pressedState}
      onPressedChange={(pressed) => {
        setPressedState(pressed);
        if (pressed) {
          enableNoSleep();
        } else {
          disableNoSleep();
        }
      }}
      aria-label="Toggle italic"
    >
      <LightningBoltIcon
        className={cn("h-4 w-4", {
          "text-green-400": pressedState,
          "text-blue-500": !pressedState,
        })}
      />
    </Toggle>
  );
}
