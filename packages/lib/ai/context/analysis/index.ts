"use server";
import to from "await-to-js";
import prisma from "@falcon/prisma";
import { TRPCError } from "@trpc/server";
import { ArticleWithContent } from "../../../server/next/article";
import { getExistingAnalysis } from "./get-existing-analysis";
import { generateArticleAnalysis } from "./generate-analysis";
import { Z_AnalysisSchema } from "./schema";
import { z } from "zod";

export const getArticleAnalysis = async ({
  articleId,
}: {
  articleId: string;
}): Promise<z.infer<typeof Z_AnalysisSchema>> => {
  // Add a synthetic delay
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const { analysis: existingAnalysis, articleMarkdown } =
    await getExistingAnalysis({
      articleId,
    });

  //console.log("existingAnalysis", existingAnalysis);
  if (existingAnalysis) {
    return existingAnalysis;
  }

  if (!articleMarkdown) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Article not found",
    });
  }
  const analysis = await generateArticleAnalysis({
    content: articleMarkdown,
  });

  //console.log("analysis", analysis);

  await prisma.articleContext.upsert({
    where: {
      articleId,
    },
    update: {
      analysis: analysis,
    },
    create: {
      articleId,
      analysis: analysis,
    },
  });

  return analysis;
};
