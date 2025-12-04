-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('PENDING', 'REPLIED', 'IGNORED');

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "status" "ContactStatus" NOT NULL DEFAULT 'PENDING';
