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
  return (
    <div>
      <SearchParams />
    </div>
  );
}
