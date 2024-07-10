-- CreateEnum
CREATE TYPE "ParsingErrorStatus" AS ENUM ('PENDING', 'RESOLVED');

-- AlterTable
ALTER TABLE "ParsingError" ADD COLUMN     "status" "ParsingErrorStatus" NOT NULL DEFAULT 'PENDING';
