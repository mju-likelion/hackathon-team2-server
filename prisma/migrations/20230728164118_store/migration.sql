-- CreateTable
CREATE TABLE "Store" (
    "storeId" TEXT NOT NULL,
    "localName" TEXT NOT NULL,
    "placeName" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Store_pkey" PRIMARY KEY ("storeId")
);

-- CreateTable
CREATE TABLE "StoreLocation" (
    "storeLocationId" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "roadNameAddress" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StoreLocation_pkey" PRIMARY KEY ("storeLocationId")
);

-- CreateTable
CREATE TABLE "StoreAddress" (
    "storeAddressId" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "firstAddress" TEXT NOT NULL,
    "secondAddress" TEXT NOT NULL,
    "thirdAddress" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "roadNameAddress" TEXT NOT NULL,
    "zipCode" TEXT,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StoreAddress_pkey" PRIMARY KEY ("storeAddressId")
);

-- CreateTable
CREATE TABLE "StoreCategory" (
    "storeCategoryId" TEXT NOT NULL,
    "categoryDetail" TEXT,
    "code" TEXT,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StoreCategory_pkey" PRIMARY KEY ("storeCategoryId")
);

-- CreateTable
CREATE TABLE "StoreInformation" (
    "storeInformationId" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "category" TEXT,
    "BCStore" TEXT,
    "registeredAt" TEXT,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StoreInformation_pkey" PRIMARY KEY ("storeInformationId")
);

-- AddForeignKey
ALTER TABLE "StoreLocation" ADD CONSTRAINT "StoreLocation_storeLocationId_fkey" FOREIGN KEY ("storeLocationId") REFERENCES "Store"("storeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreAddress" ADD CONSTRAINT "StoreAddress_storeAddressId_fkey" FOREIGN KEY ("storeAddressId") REFERENCES "Store"("storeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreCategory" ADD CONSTRAINT "StoreCategory_storeCategoryId_fkey" FOREIGN KEY ("storeCategoryId") REFERENCES "Store"("storeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreInformation" ADD CONSTRAINT "StoreInformation_storeInformationId_fkey" FOREIGN KEY ("storeInformationId") REFERENCES "Store"("storeId") ON DELETE RESTRICT ON UPDATE CASCADE;
