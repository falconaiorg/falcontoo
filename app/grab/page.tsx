// Why suspense: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout

"use client";
import { SearchParams } from "./search-params";
import { fetchArticle } from "./action";
import { useSearchParams } from "next/navigation";
import { isUri } from "valid-url";
import { useState } from "react";

type GrabParams = {
  url: string | undefined;
  title: string | undefined;
  text: string | undefined;
};

export default function Grab() {
  const [message, setMessage] = useState<string | null>(null);
  let articleUrl: string | undefined;
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || undefined;
  const title = searchParams.get("title") || undefined;
  const text = searchParams.get("text") || undefined;
  articleUrl = url;
  if (!url) {
    const isUrlInText = text && isUri(text);
    const isUrlInTitle = title && isUri(title);
    if (isUrlInText) {
      articleUrl = isUrlInText;
    } else if (isUrlInTitle) {
      articleUrl = isUrlInTitle;
    } else {
      setMessage("Can't save this article. Try adding manually.");
    }
  }

  return (
    <div>
      {message ? message : null}
      {articleUrl}
    </div>
  );
}
