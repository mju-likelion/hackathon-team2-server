/*
  Warnings:

  - You are about to drop the column `BCStore` on the `StoreInformation` table. All the data in the column will be lost.
  - You are about to drop the column `registeredAt` on the `StoreInformation` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `placeName` to the `StoreInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StoreCategory" DROP CONSTRAINT "StoreCategory_storeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "StoreInformation" DROP CONSTRAINT "StoreInformation_storeInformationId_fkey";

-- DropForeignKey
ALTER TABLE "StoreLocation" DROP CONSTRAINT "StoreLocation_storeLocationId_fkey";

-- AlterTable
ALTER TABLE "StoreInformation" DROP COLUMN "BCStore",
DROP COLUMN "registeredAt",
ADD COLUMN     "placeName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Store";

-- AddForeignKey
ALTER TABLE "StoreLocation" ADD CONSTRAINT "StoreLocation_storeLocationId_fkey" FOREIGN KEY ("storeLocationId") REFERENCES "StoreInformation"("storeInformationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreCategory" ADD CONSTRAINT "StoreCategory_storeCategoryId_fkey" FOREIGN KEY ("storeCategoryId") REFERENCES "StoreInformation"("storeInformationId") ON DELETE RESTRICT ON UPDATE CASCADE;
