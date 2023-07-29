/*
  Warnings:

  - You are about to drop the `StoreAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoreAddress" DROP CONSTRAINT "StoreAddress_storeAddressId_fkey";

-- DropTable
DROP TABLE "StoreAddress";
