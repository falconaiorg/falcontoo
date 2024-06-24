-- AlterTable
ALTER TABLE "ArticleContext" ADD COLUMN     "analysis" JSONB,
ALTER COLUMN "markdown" DROP NOT NULL;
