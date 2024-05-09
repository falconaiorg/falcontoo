"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "./action";
import { AIMarkdown } from "@/components/chat/ai-markdown";
import { useSearchParams } from "next/navigation";
import { useShareParams } from "@/hooks/use-share-params";
const urlTest = "https://substack.com/home/post/p-144117118?source=queue";

export function SearchParams() {
  const { text, url, title } = useShareParams();
  const {
    data: markdown,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos", url],
    queryFn: () => fetchArticle(url),
    enabled: !!url,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!markdown) return <div>No content found.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="text-xl font-semibold">{url}</h2>
      <h3 className="text-lg font-medium">{text}</h3>
      <AIMarkdown content={markdown} className="p-3 py-4" />;
    </div>
  );
}
