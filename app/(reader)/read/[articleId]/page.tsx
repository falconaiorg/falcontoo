import { getServerComponentSession } from "@/auth";
import { server } from "@/server/next";
import MarkdownWithHighlight from "../../components/markdown/with-highlight";
import { FilterButton } from "../../components/filter-btn";
import { AnnotationDrawer } from "../../components/drawer/annotation-drawer";

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
  const article = await server.article.getArticlebyArticleId({
    articleId,
    userId: user.id,
  });
  return (
    <div className="px-4 py-2">
      <FilterButton />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{article.content.title}</h1>
        <p className="text-gray-500">{article.content.description}</p>
      </div>
      <div>
        <h1>Markdown with Highlighted Words</h1>
        <MarkdownWithHighlight
          markdownText={article.content.markdown}
          searchWords={searchWords}
        />
        <AnnotationDrawer />
      </div>
    </div>
  );
}
