-- CreateTable
CREATE TABLE "VaultGame" (
    "id" SERIAL NOT NULL,
    "dealId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumb" TEXT,
    "steamRatingPercent" INTEGER NOT NULL DEFAULT 0,
    "steamRatingText" TEXT,
    "steamRatingCount" INTEGER NOT NULL DEFAULT 0,
    "metacriticScore" INTEGER NOT NULL DEFAULT 0,
    "salePrice" DOUBLE PRECISION NOT NULL,
    "normalPrice" DOUBLE PRECISION NOT NULL,
    "dealRating" DOUBLE PRECISION,
    "releaseYear" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'BACKLOG',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VaultGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VaultGame_dealId_key" ON "VaultGame"("dealId");
