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

  const article = await fetchArticle(url);
  if (!article) {
    return <div>No content found.</div>;
  }

  return (
    <div>
      {/* <MarkdownWithHighlight
        markdownText={article}
        searchWords={[
          "Everyone else in the audience was probably local, but Steve and Alexis came up on the train from the University of Virginia, where they were seniors. Since they'd come so far I agreed to meet them for coffee. They told me about the startup idea we'd later fund them to drop: a way to order fast food on your cellphone.",
        ]}
      /> */}
      <SearchParams />
    </div>
  );
}
