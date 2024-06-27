-- CreateEnum
CREATE TYPE "AIVoice" AS ENUM ('AUTO');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "location" TEXT,
    "education" TEXT,
    "work" TEXT,
    "favouriteGenres" TEXT[],
    "favouriteAuthors" TEXT[],
    "favouriteTopics" TEXT[],

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
    "theme" "Theme" NOT NULL DEFAULT 'DARK',
    "fontFamily" TEXT NOT NULL DEFAULT 'Inter',
    "fontSize" INTEGER NOT NULL DEFAULT 14,
    "lineHeight" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
    "padding" INTEGER NOT NULL DEFAULT 10,
    "readingSpeed" INTEGER NOT NULL DEFAULT 200,
    "aiVoice" "AIVoice" NOT NULL DEFAULT 'AUTO',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "About_userId_key" ON "About"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "About" ADD CONSTRAINT "About_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
