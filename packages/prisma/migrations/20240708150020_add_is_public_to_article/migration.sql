-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publicComment" TEXT;
