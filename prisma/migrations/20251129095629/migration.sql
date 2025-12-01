/*
  Warnings:

  - The `chips` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `amenities` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "chips",
ADD COLUMN     "chips" JSONB[],
DROP COLUMN "amenities",
ADD COLUMN     "amenities" JSONB[];
