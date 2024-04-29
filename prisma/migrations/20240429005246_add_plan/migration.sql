-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('TRIAL', 'PRO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'TRIAL',
ADD COLUMN     "planEnd" TIMESTAMP(3),
ADD COLUMN     "planStart" TIMESTAMP(3);
