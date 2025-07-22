/*
  Warnings:

  - You are about to drop the column `slug` on the `College` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "College_slug_key";

-- AlterTable
ALTER TABLE "College" DROP COLUMN "slug",
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "note" TEXT;
