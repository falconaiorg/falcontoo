import { Prisma } from "@falcon/prisma/client";

export type ParsedArticle = Omit<Prisma.ArticleCreateInput, "user" | "content">;

export type Article = Omit<Prisma.ArticleCreateInput, "User" | "content">;

export type ArticleContent = Prisma.ArticleContentCreateInput;

export type ArticleWithContent = Article & ArticleContent;
