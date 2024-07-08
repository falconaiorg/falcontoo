import { api } from "@falcon/trpc/next/client";
const ONE_HOUR = 60 * 60 * 1000;

export const usePrefetchArticle = () => {
  const trpcUtils = api.useUtils();
  const prefetchArticle = async ({ articleId }: { articleId: string }) => {
    await Promise.all([
      trpcUtils.articles.getArticle.prefetch(
        { articleId: articleId },
        { staleTime: Infinity },
      ),
      trpcUtils.articles.getArticleAnalysis.prefetch(
        { articleId: articleId },
        { staleTime: ONE_HOUR },
      ),
    ]);
  };
  return { prefetchArticle };
};
