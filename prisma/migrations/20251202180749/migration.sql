/*
  Warnings:

  - The `fullContent` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "fullContent",
ADD COLUMN     "fullContent" TEXT[];
