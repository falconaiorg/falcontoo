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
import { ArticleWithContent } from "@/server/next/article";

const dummyArticleData = [
  {
    title: "How to use Lex in a very very long article title",
    author: "FalconAI is a very very long author name",
    thumbnail: "lex.png",
  },
  {
    title: "How to use Lex",
    author: "FalconAI",
    thumbnail: "lex.png",
  },
];

export const ArticleCard = ({ article }: { article: ArticleWithContent }) => (
  <Card className="flex flex-row items-center justify-between px-1">
    <CardHeader>
      <CardTitle className="leading-5">{article.content.title}</CardTitle>
      <CardDescription>{article.content.description}</CardDescription>
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

export const ArticleList = ({
  articles,
}: {
  articles: ArticleWithContent[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => (
        <Link
          href={url.reader.read({ articleId: article.id })}
          key={article.id}
        >
          <ArticleCard article={article} />
        </Link>
      ))}
    </div>
  );
};
