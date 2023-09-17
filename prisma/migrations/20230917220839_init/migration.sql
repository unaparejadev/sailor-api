-- CreateTable
CREATE TABLE "Senshi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codeName" TEXT NOT NULL,
    "planet" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Familiar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "senshiId" INTEGER NOT NULL,
    CONSTRAINT "Familiar_senshiId_fkey" FOREIGN KEY ("senshiId") REFERENCES "Senshi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Color" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "senshiId" INTEGER NOT NULL,
    CONSTRAINT "Color_senshiId_fkey" FOREIGN KEY ("senshiId") REFERENCES "Senshi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Accessory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "senshiId" INTEGER NOT NULL,
    CONSTRAINT "Accessory_senshiId_fkey" FOREIGN KEY ("senshiId") REFERENCES "Senshi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Senshi_codeName_key" ON "Senshi"("codeName");
