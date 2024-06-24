import { z } from "zod";
const verdictSchema = z.enum(["high", "medium", "low"]);
export const Z_AnalysisSchema = z.object({
  domain: z.array(z.string()).describe("The article's domain or domains"),
  sources: z
    .array(z.string())
    .describe("The sources used in the article, impicitly of explicitly"),
  contentMarketing: z
    .object({
      isBlatantContentMarketing: z.boolean(),
      comments: z.string().describe("Comments on the content marketing."),
    })
    .describe("Whether the article is just blatant content marketing."),
  expertiseMismatch: z.object({
    authorName: z.string(),
    authorDetected: z
      .boolean()
      .describe("Whether the author name was detected or is unknown."),
    authorExperience: z.array(z.string()).describe("The author's experience"),
    comments: z.string().describe("Comments on the mismatch"),
    mismatchLevel: verdictSchema.describe(
      "The mismatch between the author's experience and the article's domain"
    ),
  }),
  clickbait: z.object({
    comments: z.string(),
    isClickbait: z.boolean(),
    clickBaitLevel: verdictSchema.describe("The level of clickbait"),
  }),
  bias: z.object({
    "political-bias": z.string(),
    sensationalism: z.string(),
    biasLevel: verdictSchema.describe("The overall level of bias"),
  }),
  news: z.object({
    isNews: z.boolean(),
  }),
  opinion: z.object({
    isOpinion: z.boolean(),
    comments: z.string().describe("Comments on the opinion"),
  }),
  logicalFallacies: z.object({
    fallacies: z.array(z.string()),
    comments: z.string(),
    fallaciesLevel: verdictSchema.describe("The level of logical fallacies"),
  }),
});
