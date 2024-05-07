"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
function SearchBar() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const url = searchParams.get("url");
  const text = searchParams.get("text");

  return (
    <>
      The query parameters are:
      {title && <div className="px-4 py-2">Title: {title}</div>}
      {url && <div className="px-4 py-2">URL: {url}</div>}
      {text && <div className="px-4 py-2">Text: {text}</div>}
    </>
  );
}

export default function Grab() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <SearchBar />
    </Suspense>
  );
}
