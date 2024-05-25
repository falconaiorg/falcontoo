"use server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { AIconfig } from "./config";
import { TRPCError } from "@trpc/server";
import { Article } from "@prisma/client";

export const split = async function ({ article }: { article: Article }) {
  try {
    const articleMarkdown = article.content;
    const { chunkSize, chunkOverlap } = AIconfig.splitter;
    const mdSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize,
      chunkOverlap,
    });

    const documentArray = await mdSplitter.createDocuments(
      [articleMarkdown],
      [
        {
          title: article.title,
          description: article.description,
          articleId: article.id,
          author: article.author,
        },
      ],
    );
    const chunks = await mdSplitter.splitText(articleMarkdown);

    return { documentArray, chunks };
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error splitting the article content.",
      cause: e,
    });
  }
};
