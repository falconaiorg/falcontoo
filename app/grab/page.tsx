"use client";
// Why suspense: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
import { Suspense } from "react";
import { useShareParams } from "@/hooks/use-share-params";

function SearchBar() {
  const { text, title, url } = useShareParams();

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
