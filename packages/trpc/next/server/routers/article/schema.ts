import { z } from "zod";

export const ZAddOrUpdateArticle = z.object({
  url: z.string().url().optional(),
});

export const ZDoesArticleExist = z.object({
  url: z.string().url().optional(),
});
