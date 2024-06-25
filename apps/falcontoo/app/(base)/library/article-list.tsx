import Image from "next/image";
import Link from "next/link";
import { url } from "@/urls";
import { ArticleCard } from "./article-card";
import { ArticleWithContent } from "@falcon/lib/server/next/article";

export const ArticleList = ({
  articles,
}: {
  articles: ArticleWithContent[];
}) => {
  return (
    <div className="mt-8 flex flex-col gap-4 pb-96">
      {articles.map((article) => (
        <Link
          href={url.reader.read({ articleId: article.id })}
          key={article.id}
        >
          <ArticleCard article={article} />
        </Link>
      ))}
      <div className="mt-10 text-center text-xl font-bold text-slate-700">
        {"That's all folks!"}
      </div>
    </div>
  );
};
