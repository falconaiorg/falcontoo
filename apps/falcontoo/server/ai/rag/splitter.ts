"use server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { AIconfig } from "./config";
import { TRPCError } from "@trpc/server";
import { Article } from "@falcon/prisma/client";
import { ArticleWithContent } from "@/server/next/article";
import { ArticleCollectionMetadata } from "../types";

export const split = async function ({
  article,
}: {
  article: ArticleWithContent;
}) {
  try {
    const articleMarkdown = article.content.markdown;
    const { chunkSize, chunkOverlap } = AIconfig.splitter;
    const mdSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize,
      chunkOverlap,
    });

    const metadata: ArticleCollectionMetadata = {
      title: article.content.title,
      description: article.content.description,
      contentId: article.content.id,
      author: article.content.author,
    };
    console.log(metadata);

    const documentArray = await mdSplitter.createDocuments(
      [articleMarkdown],
      [metadata],
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
