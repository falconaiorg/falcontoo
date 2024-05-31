import { getServerComponentSession } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { ArticleWithContent, ParsedArticle } from "@/server/parser/types";
import { ArticleWithContent as ArticleIncludingContent } from "./get-article";
import prisma from "@/prisma";

export const saveArticle = async (
  articleData: ArticleWithContent,
): Promise<ArticleIncludingContent> => {
  const { user } = await getServerComponentSession();

  const { markdownChecksum } = articleData;

  const existingContent = await prisma.articleContent.findUnique({
    where: {
      markdownChecksum,
    },
  });
  if (existingContent === null) {
    const newArticle = await prisma.article.create({
      data: {
        User: {
          connect: {
            id: user.id,
          },
        },
        content: {
          create: {
            author: articleData.author,
            markdown: articleData.markdown,
            markdownChecksum: articleData.markdownChecksum,
            title: articleData.title,
            url: articleData.url,
            readablityHtml: articleData.readablityHtml,
            publishedAt: articleData.publishedAt,
            description: articleData.description,
            thumbnail: articleData.thumbnail,
          },
        },
      },
      include: {
        content: true,
      },
    });
    revalidatePath("/");
    revalidateTag("articles");
    return newArticle;
  }
  const newArticle = await prisma.article.create({
    data: {
      User: {
        connect: {
          id: user.id,
        },
      },
      content: {
        connect: {
          id: existingContent.id,
        },
      },
    },
    include: {
      content: true,
    },
  });
  revalidatePath("/");
  revalidateTag("articles");
  return newArticle;
};
