"use server";
import { z } from "zod";
import { generateObject, generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import endent from "endent";
import prisma from "@falcon/prisma";
import { Z_AnalysisSchema } from "./schema";

export type Analysis = z.infer<typeof Z_AnalysisSchema>;

export async function generateArticleAnalysis({
  content,
}: {
  content: string;
}) {
  const analysis = await generateObject({
    model: openai("gpt-4o", {}),
    messages: [
      {
        role: "system",
        content: "Analyse the following article.",
      },
      { role: "user", content },
    ],
    schema: Z_AnalysisSchema,
  });
  return analysis.object;
}
