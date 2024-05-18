import { Prisma } from "@prisma/client";

export type ParsedArticle = Omit<Prisma.ArticleCreateInput, "user">;
