"use server";
import { vectorDimensions, VectorDimensionKeys } from "../config";
import { QdrantClient } from "@qdrant/js-client-rest";
import { TRPCError } from "@trpc/server";

export const deleteCollection = async function (collectionName: string) {
  try {
    const client = new QdrantClient({
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
    });
    const test = await client.deleteCollection(collectionName);
    if (test) {
      //console.log("Collection deleted");
    }
  } catch (e) {
    //console.log(e);
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
      message: "Error deleting collection.",
      cause: e,
    });
  }
};

export const createCollection = async function ({
  name,
  size,
}: {
  name: string;
  size: VectorDimensionKeys;
}) {
  const dimensions = vectorDimensions[size];

  try {
    const client = new QdrantClient({
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
    });

    const isCreated = await client.createCollection(name, {
      vectors: {
        size: dimensions,
        distance: "Cosine",
      },
    });
    if (isCreated) {
      //console.log("Collection created");
    }
    return isCreated;
  } catch (e) {
    //console.log(e);
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
      message: "Error creating collection.",
      cause: e,
    });
  }
};
