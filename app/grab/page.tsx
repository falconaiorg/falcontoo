"use client";
// Why suspense: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
import { Suspense } from "react";
import { SearchParams } from "./search-params";




export default function Grab() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <SearchParams />
    </Suspense>
  );
}
