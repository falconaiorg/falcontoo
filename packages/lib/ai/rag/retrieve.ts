"use server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { AIconfig } from "./config";
import { QdrantVectorStore } from "@langchain/qdrant";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from "@langchain/core/output_parsers";

import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";

const formatDocumentsAsString = (documents: Document[]) => {
  return documents.map((document) => document.pageContent).join("\n\n");
};

export const retrieve = async ({ query }: { query: string }) => {
  const { small: embeddingModel } = AIconfig.embedding.model;
  const embeddings = new OpenAIEmbeddings({
    model: embeddingModel.name,
    dimensions: embeddingModel.dimensions.default,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      apiKey: process.env.QDRANT_API_KEY,
      url: process.env.QDRANT_URL,
      collectionName: "articles",
    },
  );

  const retriever = vectorStore.asRetriever({
    k: 5,
  });

  const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}`;
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    ["human", "{question}"],
  ]);

  const model = new ChatGroq({
    temperature: 0.9,
    apiKey: process.env.GROQ_API_KEY,
    model: "llama3-70b-8192",
  });

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const answer = await chain.invoke(query);

  return answer;
};

// Basic Retrieval
export const queryVectorStore = async (query: string) => {
  const { small: model } = AIconfig.embedding.model;
  const embeddings = new OpenAIEmbeddings({
    model: model.name,
    dimensions: model.dimensions.default,
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      apiKey: process.env.QDRANT_API_KEY,
      url: process.env.QDRANT_URL,
      collectionName: "articles",
    },
  );

  const response = await vectorStore.similaritySearch(query, 5);

  return response;
  console.log(response);
};
