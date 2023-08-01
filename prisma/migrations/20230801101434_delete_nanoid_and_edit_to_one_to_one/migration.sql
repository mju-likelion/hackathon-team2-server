/*
  Warnings:

  - A unique constraint covering the columns `[locationId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Store_locationId_key" ON "Store"("locationId");
