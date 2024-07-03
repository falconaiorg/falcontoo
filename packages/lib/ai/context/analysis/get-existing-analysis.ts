import prisma from "@falcon/prisma";
import { Z_AnalysisSchema } from "./schema";

const getArticleMarkdown = async ({ articleId }: { articleId: string }) => {
  const articleMarkdown = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
    select: {
      content: {
        select: {
          markdown: true,
        },
      },
    },
  });
  return articleMarkdown?.content.markdown;
};

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
    const markdown = await getArticleMarkdown({ articleId });

    return {
      articleMarkdown: markdown,
      analysis: null,
    };
  }
  const validatedAnalysis = Z_AnalysisSchema.safeParse(context.analysis);
  if (validatedAnalysis.success) {
    //console.log("validatedAnalysis", validatedAnalysis.data);
    return {
      articleMarkdown: undefined,
      analysis: validatedAnalysis.data,
    };
  } else {
    console.error("Failed to validate analysis", validatedAnalysis.error);
    return {
      articleMarkdown: await getArticleMarkdown({ articleId }),
      analysis: null,
    };
  }
};
