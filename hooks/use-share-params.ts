"use client";
import manifest from "@/public/manifest.json";
import { useSearchParams } from "next/navigation";

type Manifest = typeof manifest;
type ShareParams = Manifest["share_target"]["params"];
type OptionalShareParams = Partial<ShareParams>;

function getShareParams(params: URLSearchParams): OptionalShareParams {
  return {
    title: params.get("name") || undefined,
    url: params.get("link") || undefined,
    text: params.get("description") || undefined,
  };
}

export function useShareParams() {
  const searchParams = useSearchParams();
  const { title, url, text } = getShareParams(searchParams);
  return { title, url, text };
}
