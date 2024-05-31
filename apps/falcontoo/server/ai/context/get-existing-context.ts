import prisma from "@/prisma";

export const getExistingArticleContext = async ({
  articleId,
}: {
  articleId: string;
}): Promise<{
  isStale: boolean | undefined;
  existingContext: string | null;
}> => {
  const context = await prisma.articleContext.findUnique({
    where: {
      articleId,
    },
  });
  if (!context) {
    return {
      isStale: undefined,
      existingContext: null,
    };
  }
  const isStale = context?.isStale;
  if (isStale) {
    return {
      isStale,
      existingContext: context.markdown,
    };
  }
  return {
    isStale: isStale,
    existingContext: context.markdown,
  };
};
