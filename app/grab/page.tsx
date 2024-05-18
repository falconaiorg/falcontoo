// Why suspense: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
import { SearchParams } from "./search-params";
import { fetchArticle } from "./action";

type GrabParams = {
  url: string | undefined;
  title: string | undefined;
  text: string | undefined;
};

export default async function Grab({
  searchParams,
}: {
  searchParams: GrabParams;
}) {
  console.log(searchParams);

  const { url } = searchParams;

  if (!url) {
    return <div>No content found.</div>;
  }

  try {
    await fetchArticle(url);
    return <div>Oops something went wrong. Please try again later.</div>;
  } catch (err) {
    return <div>Oops something went wrong. Please try again later.</div>;
  }
}
