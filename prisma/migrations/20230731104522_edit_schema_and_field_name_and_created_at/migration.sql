/*
  Warnings:

  - The primary key for the `StoreLocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `storeLocationId` on the `StoreLocation` table. All the data in the column will be lost.
  - You are about to drop the `StoreCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreInformation` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `StoreLocation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "StoreInformation" DROP CONSTRAINT "StoreInformation_categoryCode_fkey";

-- DropForeignKey
ALTER TABLE "StoreInformation" DROP CONSTRAINT "StoreInformation_locationId_fkey";

-- AlterTable
ALTER TABLE "StoreLocation" DROP CONSTRAINT "StoreLocation_pkey",
DROP COLUMN "storeLocationId",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "StoreLocation_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "StoreCategory";

-- DropTable
DROP TABLE "StoreInformation";

-- CreateTable
CREATE TABLE "Category" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "StoreLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
