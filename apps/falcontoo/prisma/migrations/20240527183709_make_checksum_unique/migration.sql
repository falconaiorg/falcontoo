/*
  Warnings:

  - You are about to drop the column `htmlChecksum` on the `ArticleContent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[markdownChecksum]` on the table `ArticleContent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ArticleContent" DROP COLUMN "htmlChecksum";

-- CreateIndex
CREATE UNIQUE INDEX "ArticleContent_markdownChecksum_key" ON "ArticleContent"("markdownChecksum");
