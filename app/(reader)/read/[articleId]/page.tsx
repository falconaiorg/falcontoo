import { getServerComponentSession } from "@/auth";
import { queries } from "@/server/next";

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
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{article.title}</h1>
        <p className="text-gray-500">{article.description}</p>
      </div>
    </div>
  );
}
