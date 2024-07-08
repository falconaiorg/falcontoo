-- CreateEnum
CREATE TYPE "ReadingStatus" AS ENUM ('READING', 'READ', 'TO_READ');

-- CreateTable
CREATE TABLE "PublicProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "socialLinks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER,
    "status" "ReadingStatus" NOT NULL DEFAULT 'READING',
    "tags" TEXT[],
    "medtadataId" TEXT,
    "publicProfileId" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookMetadata" (
    "id" TEXT NOT NULL,
    "googleBooksId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authors" TEXT[],
    "thumbnail" TEXT,

    CONSTRAINT "BookMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicProfile_userId_key" ON "PublicProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicProfile_username_key" ON "PublicProfile"("username");

-- CreateIndex
CREATE INDEX "PublicProfile_username_idx" ON "PublicProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "BookMetadata_googleBooksId_key" ON "BookMetadata"("googleBooksId");

-- AddForeignKey
ALTER TABLE "PublicProfile" ADD CONSTRAINT "PublicProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_medtadataId_fkey" FOREIGN KEY ("medtadataId") REFERENCES "BookMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_publicProfileId_fkey" FOREIGN KEY ("publicProfileId") REFERENCES "PublicProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
