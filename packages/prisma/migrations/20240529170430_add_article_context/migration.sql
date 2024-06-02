-- CreateTable
CREATE TABLE "ArticleContext" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "articleId" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "linkedArticles" TEXT[],
    "isStale" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ArticleContext_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleContext_articleId_key" ON "ArticleContext"("articleId");

-- AddForeignKey
ALTER TABLE "ArticleContext" ADD CONSTRAINT "ArticleContext_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
