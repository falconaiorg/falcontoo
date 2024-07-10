import { ArticleWithContent, ParsedArticle } from "../../../parser/types";
import { ArticleWithContent as ArticleIncludingContent } from "./get-article";
import prisma from "@falcon/prisma";
import { createId } from "@paralleldrive/cuid2";

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
        isParsed: true,
        content: {
          create: {
            author: articleData.author,
            markdown: articleData.markdown,
            markdownChecksum: articleData.markdownChecksum,
            title: articleData.title,
            url: articleData.url,
            readablityHtml: articleData.readablityHtml, // Fix typo
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
      isParsed: true,
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

type ArticleWithoutContent = {
  url: string;
  title: string | undefined;
  description: string | undefined;
  thumbnail: string | undefined;
  publishedAt: string | undefined;
  author: string | undefined;
};
export const saveArticleWithoutContent = async ({
  articleData,
  userId,
  parsingError,
}: {
  userId: string;
  articleData: ArticleWithoutContent;
  parsingError: Error;
}): Promise<ArticleIncludingContent> => {
  const randomMarkdownChecksum = createId();

  const publishedAtDate = articleData.publishedAt
    ? new Date(articleData.publishedAt)
    : new Date();
  const newArticle = await prisma.article.create({
    data: {
      User: {
        connect: {
          id: userId,
        },
      },
      isParsed: false,
      content: {
        create: {
          author: articleData.author || "Not Found",
          markdown: "",
          markdownChecksum: randomMarkdownChecksum,
          title: articleData.title || "Not Found",
          url: articleData.url || "Not Found",
          readablityHtml: "",
          publishedAt: publishedAtDate,
          description: articleData.description,
          thumbnail: articleData.thumbnail,
        },
      },
    },
    include: {
      content: true,
    },
  });
  try {
    await prisma.parsingError.create({
      data: {
        url: articleData.url,
        error: parsingError.message,
        stack: parsingError.stack,
        userId,
        articleId: newArticle.id,
        hostname: new URL(articleData.url).hostname,
      },
    });
  } catch (error) {
    console.error("Error saving parsing error", error);
  }

  return newArticle;
};
