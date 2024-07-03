"use client";
import { backBarAtom } from "@/app/(reader)/components/drawer/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function SetBackBar({ title, url }: { title: string; url: string }) {
  const [, setBackBar] = useAtom(backBarAtom);

  useEffect(() => {
    setBackBar({ title, url });
  }, [title, url, setBackBar]);

  return null;
}
