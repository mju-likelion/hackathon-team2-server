-- DropIndex
DROP INDEX "StoreLocation_latitude_longitude_idx";

-- CreateIndex
CREATE INDEX "StoreLocation_latitude_longitude_idx" ON "StoreLocation"("latitude" DESC, "longitude" DESC);
