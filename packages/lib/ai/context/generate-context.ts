"use server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { AIconfig } from "../rag/config";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import OpenAI from "openai";

import prisma from "@falcon/prisma";
import { ArticleCollectionMetadata } from "../types";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import endent from "endent";
import { getServerComponentSession } from "../../next-auth";
import { ArticleWithContent } from "../../server/next/article";
type PointsFromScroll = Awaited<ReturnType<QdrantClient["scroll"]>>["points"];
type Payload = {
  content: string;
  metadata: ArticleCollectionMetadata;
};
const openai = new OpenAI();

export const getContentIdsOfReadArticles = async () => {
  const { id: userId } = (await getServerComponentSession()).user;

  const contentIddata = await prisma.article.findMany({
    where: {
      userId,
      readingProgress: 100,
    },
    select: {
      contentId: true,
    },
  });

  const contentIds = contentIddata.map(({ contentId }) => contentId);

  return contentIds;
};

export const getCurrentArticleEmbeddings = async ({
  contentId,
}: {
  contentId: string;
}): Promise<PointsFromScroll> => {
  const FILTER_KEY = "metadata.contentId";
  const collectionName = AIconfig.qdrant.collecions.articles.name;
  const client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });
  const vectorObject = await client.scroll(collectionName, {
    filter: {
      must: [
        {
          key: FILTER_KEY,
          match: {
            value: contentId,
          },
        },
      ],
    },
    with_vector: true,
  });
  const vectorArray = vectorObject.points;
  return vectorArray;
};

const searchArticles = async ({
  currentArticleEmbeddings,
  readContentIds,
}: {
  currentArticleEmbeddings: PointsFromScroll;
  readContentIds: string[];
}) => {
  const collectionName = AIconfig.qdrant.collecions.articles.name;
  const client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });

  const searches = currentArticleEmbeddings.map((point) => ({
    vector: point.vector as number[],
    limit: 3,
    filter: {
      must: [
        {
          key: "metadata.contentId",
          match: { any: readContentIds },
        },
      ],
    },
  }));
  console.log(searches);

  const results = await client.searchBatch(collectionName, {
    searches: currentArticleEmbeddings.map((point) => ({
      vector: point.vector as number[],
      limit: 3,
      with_vector: true,
      with_payload: true,
      filter: {
        must: [
          {
            key: "metadata.contentId",
            match: { any: readContentIds },
          },
        ],
      },
    })),
  });

  const allResults = results.flat();
  const sorted = allResults.sort((a, b) => b.score - a.score);
  const topKChunks = sorted.slice(0, 10);

  const relevantChunks = topKChunks;

  console.log(topKChunks);

  let chunkMarkdown = "# Top 5 Relevant Chunks\n\n";

  topKChunks.forEach((chunk, index) => {
    const { content, metadata } = chunk.payload as Payload;
    chunkMarkdown += `## ${index + 1}. ${metadata.title}\n`;
    chunkMarkdown += `**Author:** ${metadata.author}\n\n`;
    chunkMarkdown += `**Description:** ${metadata.description}\n\n`;
    chunkMarkdown += `**Content:**\n\n${content}\n\n`;
    chunkMarkdown += `---\n\n`;
  });

  const chunksByContentId: Record<string, typeof allResults> = {};

  allResults.forEach((chunk) => {
    const payload = chunk.payload as Payload;
    const contentId = payload.metadata.contentId;
    if (!chunksByContentId[contentId]) {
      chunksByContentId[contentId] = [];
    }
    chunksByContentId[contentId].push(chunk);
  });

  // Sort each group by score in descending order
  Object.values(chunksByContentId).forEach((group) => {
    group.sort((a, b) => b.score - a.score);
  });

  // Find the top 3 articles with the most relevant chunks
  const contentIdScores = Object.entries(chunksByContentId)
    .map(([contentId, chunks]) => ({
      contentId,
      score: chunks.reduce((sum, chunk) => sum + chunk.score, 0),
      chunks,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const relevantArticles = contentIdScores;

  console.log("Top 3 Recommended Articles:", contentIdScores);

  return { relevantChunks, relevantArticles, chunkMarkdown };
};

export const generateArticleContext = async ({
  article,
}: {
  article: ArticleWithContent;
}): Promise<string> => {
  const { id: articleId, contentId } = article;
  // Get embeddings of all the chunks of the current article
  const currentArticleEmbeddings = await getCurrentArticleEmbeddings({
    contentId,
  });

  // Get all the articles the user has read
  const readContentIds = await getContentIdsOfReadArticles();

  console.log(readContentIds);

  // Loop though each chunk of the current article,
  // and find top-k similar chunks from the articles the user has read

  const { relevantChunks, relevantArticles, chunkMarkdown } =
    await searchArticles({
      currentArticleEmbeddings,
      readContentIds,
    });

  const currenArticle = {
    title: article.content.title,
    description: article.content.description,
    author: article.content.author,
    blurb: article.content.markdown.slice(0, 1000),
  };

  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  const { text } = await generateText({
    model: groq("llama3-70b-8192"),
    prompt: endent`You help users refresh their memory by providing a short review of similar content they have already read.
    You have the article that the user is currently reading and the chunks from the articles they have already read.
    Contextualize the current article by providing a short review of the similar content the user has already read.
________________
## Current Article:
Title: ${currenArticle.title}
Description: ${currenArticle.description}
Author: ${currenArticle.author}
Blurb: ${currenArticle.blurb}
----------------
## Chunks from Read Articles:
${chunkMarkdown}
----------------
Context:
`,
  });

  console.log(text);

  return text;
};
