import { useSearchParams } from "next/navigation";
import { isUri } from "valid-url";

export const useShareUrlFromParams = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const title = searchParams.get("title");
  const text = searchParams.get("text");

  let articleUrl: string | undefined;

  if (url) {
    articleUrl = url;
  } else if (text && isUri(text)) {
    articleUrl = text;
  } else if (title && isUri(title)) {
    articleUrl = title;
  }

  return articleUrl;
};
