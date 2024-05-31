export const vectorDimensions = {
  large: 3072, // Default for text-embedding-3-large
  medium: 2304,
  small: 1536, // Default for text-embedding-3-small
} as const;

export type VectorDimensionKeys = keyof typeof vectorDimensions;

export const AIconfig = {
  splitter: {
    chunkSize: 500,
    chunkOverlap: 100,
  },
  embedding: {
    model: {
      large: {
        name: "text-embedding-3-large",
        dimensions: {
          default: vectorDimensions.large,
          medium: vectorDimensions.medium,
          small: vectorDimensions.small, // equivalent to text-embedding-3-small but performance is better
        },
      },
      small: {
        name: "text-embedding-3-small",
        dimensions: {
          default: vectorDimensions.small,
        },
      },
    },
  },
  qdrant: {
    collecions: {
      articles: {
        name: "articles",
        names: {
          small: "small",
          large: "large",
        },
      },
    },
  },
};
/**
 * https://platform.openai.com/docs/guides/embeddings/what-are-embeddings
 * By default, the length of the embedding vector will be 1536 for text-embedding-3-small or 3072 for text-embedding-3-large.
 * You can reduce the dimensions of the embedding by passing in the dimensions parameter without the embedding losing its concept-representing properties.
 * We go into more detail on embedding dimensions in the embedding use case section.
 */
