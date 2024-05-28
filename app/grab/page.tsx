// Why suspense: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout

"use client";
import { GrabArticle } from "./grab-article";
import { useShareUrlFromParams } from "./use-share-url-from-params";

export default function Grab() {
  const url = useShareUrlFromParams();

  if (!url) {
    return (
      <div>Unable to automatically import. Add manually from your libary.</div>
    );
  }

  return <GrabArticle url={url} />;
}
