/*
  Warnings:

  - Changed the type of `chips` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `amenities` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "chips",
ADD COLUMN     "chips" JSONB NOT NULL,
DROP COLUMN "amenities",
ADD COLUMN     "amenities" JSONB NOT NULL;
