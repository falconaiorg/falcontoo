// Why suspense: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout

"use client";
import { SearchParams } from "./search-params";
import { fetchArticle } from "./action";
import { useSearchParams } from "next/navigation";

type GrabParams = {
  url: string | undefined;
  title: string | undefined;
  text: string | undefined;
};

export default function Grab() {
  const searchParams = useSearchParams();
  const title = searchParams.get("url") || undefined;
  const url = searchParams.get("title") || undefined;
  const text = searchParams.get("text") || undefined;

  console.log("searchParams", searchParams);

  searchParams.forEach((value, key) => {
    console.log(key, value);
  });

  /// return all for testing
  return (
    <div>
      <>{title ? title : "Title not found"}</>
      <br />
      <>{url ? url : "URL not found"}</>
      <br />
      <>{text ? text : "Text not found"}</>

      {/* <SearchParams /> */}
    </div>
  );
}
