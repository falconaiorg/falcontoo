"use server";
// Retry the embedding process, if failed
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import prisma from "@falcon/prisma";
import { Article } from "@falcon/prisma/client";
import { TRPCError } from "@trpc/server";
import { split } from "./splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { AIconfig } from "./config";
import { match } from "assert";

export const embedInQdrant = async function ({
  documents,
}: {
  documents: Document[];
}) {
  try {
    const { small: model } = AIconfig.embedding.model;

    const embeddings = new OpenAIEmbeddings({
      model: model.name,
      dimensions: model.dimensions.default,
    });

    const vectorStore = await QdrantVectorStore.fromDocuments(
      documents,
      embeddings,
      {
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: "articles",
      },
    );

    await vectorStore.addDocuments(documents);
    //console.log("Documents added to Qdrant");
  } catch (e) {
    //console.log(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error embedding the article content.",
      cause: e,
    });
  }
};
