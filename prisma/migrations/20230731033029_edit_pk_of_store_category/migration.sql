/*
  Warnings:

  - The primary key for the `StoreCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryCode` on the `StoreInformation` table. All the data in the column will be lost.
  - The required column `id` was added to the `StoreCategory` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `categoryId` to the `StoreInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StoreInformation" DROP CONSTRAINT "StoreInformation_categoryCode_fkey";

-- AlterTable
ALTER TABLE "StoreCategory" DROP CONSTRAINT "StoreCategory_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "StoreCategory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StoreInformation" DROP COLUMN "categoryCode",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StoreInformation" ADD CONSTRAINT "StoreInformation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StoreCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
