import { ArticleWithContent, ParsedArticle } from "../../../parser/types";
import { ArticleWithContent as ArticleIncludingContent } from "./get-article";
import prisma from "@falcon/prisma";

export const saveArticle = async ({
  articleData,
  userId,
}: {
  userId: string;
  articleData: ArticleWithContent;
}): Promise<ArticleIncludingContent> => {
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
            id: userId,
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
    return newArticle;
  }
  const newArticle = await prisma.article.create({
    data: {
      User: {
        connect: {
          id: userId,
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
  return newArticle;
};
