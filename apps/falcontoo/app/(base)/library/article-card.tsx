"use client";
import type { Article } from "@falcon/prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { url } from "@/urls";
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
export const ArticleCard = ({ article }: { article: ArticleWithContent }) => (
  <Card className="flex h-32 flex-row items-center justify-between px-1">
    <CardHeader>
      <CardTitle className="line-clamp-2 text-sm font-medium leading-5">
        {article.content.title}
      </CardTitle>
      <CardDescription className="line-clamp-3 text-xs">
        {article.content.description}
      </CardDescription>
    </CardHeader>
    <Image
      src={"/lex.png"}
      alt="Thumbnail"
      className="h-10 w-10"
      width={10}
      height={10}
    />
  </Card>
);
