import { ArticleContent } from "@prisma/client";

export type ArticleCollectionMetadata = {
  title: ArticleContent["title"];
  description: ArticleContent["description"];
  author: ArticleContent["author"];
  contentId: ArticleContent["id"];
};
