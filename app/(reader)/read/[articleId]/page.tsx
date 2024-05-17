import { getServerComponentSession } from "@/auth";
import { queries } from "@/server/next";
import MarkdownWithHighlight from "../../markdown/with-highlight";
import { FilterButton } from "../../filter-btn";

const markdownText = `
# Sample Markdown
This is a sample markdown text. The words 'sample' and 'markdown' should be highlighted.
`;

const searchWords = [
  "This is a sample markdown text. The words 'sample' and 'markdown'",
];

export default async function ReadPage({
  params,
}: {
  params: { articleId: string };
}) {
  const articleId = params.articleId;
  const { user } = await getServerComponentSession();
  const article = await queries.article.getArticlebyArticleId({
    articleId,
    userId: user.id,
  });
  return (
    <div className="px-4 py-2">
      <FilterButton />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{article.title}</h1>
        <p className="text-gray-500">{article.description}</p>
      </div>
      <div>
        <h1>Markdown with Highlighted Words</h1>
        <MarkdownWithHighlight
          markdownText={markdownText}
          searchWords={searchWords}
        />
      </div>
    </div>
  );
}
