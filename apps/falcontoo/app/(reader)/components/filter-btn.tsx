"use client";
import { useAtom, useSetAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { filterAtom } from "@falcon/lib/state/app";

export function FilterButton() {
  const [filter, setFilter] = useAtom(filterAtom);

  return (
    <Button onClick={() => setFilter((filter) => !filter)}>
      {filter ? "Remove Filter" : "Apply Filter"}
    </Button>
  );
}
