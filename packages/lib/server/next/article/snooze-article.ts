import prisma from "@falcon/prisma";
import to from "await-to-js";

export async function snoozeArticle({
  articleId,
  snoozeDate,
}: {
  articleId: string;
  snoozeDate: Date;
}) {
  console.log("articleId", articleId);
  const [err, updatedArticle] = await to(
    prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        snoozedUntil: snoozeDate,
      },
    })
  );

  if (err) {
    console.log(err);
    throw new Error("Failed to snooze article");
  }
  return updatedArticle;
}
