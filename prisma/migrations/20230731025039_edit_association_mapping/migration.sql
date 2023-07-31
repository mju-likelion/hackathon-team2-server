/*
  Warnings:

  - The primary key for the `StoreCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deletedAt` on the `StoreCategory` table. All the data in the column will be lost.
  - You are about to drop the column `storeCategoryId` on the `StoreCategory` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `StoreInformation` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `StoreInformation` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `StoreLocation` table. All the data in the column will be lost.
  - Made the column `categoryDetail` on table `StoreCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `StoreCategory` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `categoryCode` to the `StoreInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `StoreInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StoreCategory" DROP CONSTRAINT "StoreCategory_storeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "StoreLocation" DROP CONSTRAINT "StoreLocation_storeLocationId_fkey";

-- AlterTable
ALTER TABLE "StoreCategory" DROP CONSTRAINT "StoreCategory_pkey",
DROP COLUMN "deletedAt",
DROP COLUMN "storeCategoryId",
ALTER COLUMN "categoryDetail" SET NOT NULL,
ALTER COLUMN "code" SET NOT NULL,
ADD CONSTRAINT "StoreCategory_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "StoreInformation" DROP COLUMN "category",
DROP COLUMN "deletedAt",
ADD COLUMN     "categoryCode" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StoreLocation" DROP COLUMN "deletedAt";

-- AddForeignKey
ALTER TABLE "StoreInformation" ADD CONSTRAINT "StoreInformation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "StoreLocation"("storeLocationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreInformation" ADD CONSTRAINT "StoreInformation_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "StoreCategory"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
