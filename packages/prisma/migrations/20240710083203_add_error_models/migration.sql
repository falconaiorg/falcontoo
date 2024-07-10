-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "isParsed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ParsingError" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "error" TEXT NOT NULL,
    "stack" TEXT,
    "url" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ParsingError_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ParsingError_hostname_idx" ON "ParsingError"("hostname");

-- AddForeignKey
ALTER TABLE "ParsingError" ADD CONSTRAINT "ParsingError_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParsingError" ADD CONSTRAINT "ParsingError_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
