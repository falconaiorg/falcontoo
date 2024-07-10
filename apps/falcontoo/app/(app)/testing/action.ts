"use server";
import prisma from "@falcon/prisma";

export async function updateAllArticlesToParsed() {
  try {
    const result = await prisma.article.updateMany({
      data: {
        isParsed: true,
      },
    });
    console.log(`Updated ${result.count} articles to parsed.`);
  } catch (error) {
    console.error("Error updating articles:", error);
  }
}
