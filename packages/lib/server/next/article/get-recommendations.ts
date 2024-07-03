import { getArticlesbyUserId } from "./get-articles";
const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_MONTH = ONE_DAY * 30;
const FRESH_ARTICLE_THRESHOLD = ONE_MONTH;

const calculateScore = (
  article: Awaited<ReturnType<typeof getArticlesbyUserId>>[0],
): number => {
  const weights = {
    estimatedReadingTimeMultiplier: -1,
    dateAddedMultiplier: 1,
  };
  let score = 0;

  // Estimated reading time
  score +=
    article.content.estimatedTime * weights.estimatedReadingTimeMultiplier;

  // Date added (older articles get higher scores)
  const daysSinceAdded =
    (new Date().getTime() - article.createdAt.getTime()) /
    (1000 * 60 * 60 * 24);
  score += daysSinceAdded * weights.dateAddedMultiplier;

  return score;
};

const getFreshArticles = ({
  articles,
}: {
  articles: Awaited<ReturnType<typeof getArticlesbyUserId>>;
}) => {
  if (articles.length === 0) {
    return [];
  }
  let threshold = FRESH_ARTICLE_THRESHOLD;
  const oldestCreatedTime = articles[articles.length - 1].createdAt; // sorted by createdAt, newest first
  let freshArticles: Awaited<ReturnType<typeof getArticlesbyUserId>> = [];

  do {
    const thresholdDate = new Date(Date.now() - threshold);
    freshArticles = articles.filter(
      (article) => article.createdAt > thresholdDate,
    );

    threshold *= 2;
  } while (
    freshArticles.length === 0 &&
    threshold <= Date.now() - oldestCreatedTime.getTime()
  );

  return freshArticles;
};

export const getRecommendedArticles = async ({
  userId,
}: {
  userId: string;
}) => {
  const articles = await getArticlesbyUserId({ userId });

  //console.log("articles", articles);

  const unReadArticles = articles.filter(
    (article) => article.readingProgress !== 100,
  );

  //console.log("unReadArticles", unReadArticles);

  if (unReadArticles.length === 0) {
    return [];
  }

  if (unReadArticles.length <= 3) {
    return unReadArticles;
  }

  const freshArticles = getFreshArticles({
    articles: unReadArticles,
  });

  //console.log("freshArticles", freshArticles);

  if (freshArticles.length === 0) {
    return articles;
  }
  // If the number of fresh articles is less than or equal to 3,
  // then first push the fresh articles to the top of the list and then return the list.
  if (freshArticles.length <= 3) {
    return freshArticles.concat(
      unReadArticles.filter((article) => !freshArticles.includes(article)),
    );
  }

  const scoredArticles = freshArticles.map((article) => ({
    ...article,
    score: calculateScore(article),
  }));
  scoredArticles.sort((a, b) => b.score - a.score);
  //console.log("scoredArticles", scoredArticles);

  // remove the score from the o from the articles before returning them
  const articlesWithoutScore = scoredArticles.map(
    ({ score, ...article }) => article,
  );

  return articlesWithoutScore;
};
