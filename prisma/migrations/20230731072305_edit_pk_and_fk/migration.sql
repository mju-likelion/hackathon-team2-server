/*
  Warnings:

  - The primary key for the `StoreCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryDetail` on the `StoreCategory` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `StoreCategory` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `StoreInformation` table. All the data in the column will be lost.
  - Added the required column `category` to the `StoreCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryCode` to the `StoreInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StoreInformation" DROP CONSTRAINT "StoreInformation_categoryId_fkey";

-- AlterTable
ALTER TABLE "StoreCategory" DROP CONSTRAINT "StoreCategory_pkey",
DROP COLUMN "categoryDetail",
DROP COLUMN "id",
ADD COLUMN     "category" TEXT NOT NULL,
ADD CONSTRAINT "StoreCategory_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "StoreInformation" DROP COLUMN "categoryId",
ADD COLUMN     "categoryCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StoreInformation" ADD CONSTRAINT "StoreInformation_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "StoreCategory"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
