import prisma from "@falcon/prisma";
import { Z_AnalysisSchema } from "./schema";

export const getExistingAnalysis = async ({
  articleId,
}: {
  articleId: string;
}) => {
  const context = await prisma.articleContext.findUnique({
    where: {
      articleId,
    },
  });
  if (!context) {
    return null;
  }
  const validatedAnalysis = Z_AnalysisSchema.safeParse(context.analysis);
  if (validatedAnalysis.success) {
    console.log("validatedAnalysis", validatedAnalysis.data);
    return validatedAnalysis.data;
  } else {
    console.error("Failed to validate analysis", validatedAnalysis.error);
    return null;
  }
};
