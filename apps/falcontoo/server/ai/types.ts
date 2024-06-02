import { ArticleContent } from "@falcon/prisma/client";

export type ArticleCollectionMetadata = {
  title: ArticleContent["title"];
  description: ArticleContent["description"];
  author: ArticleContent["author"];
  contentId: ArticleContent["id"];
};
