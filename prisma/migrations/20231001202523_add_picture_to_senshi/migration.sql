-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Senshi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codeName" TEXT NOT NULL,
    "planet" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "picture" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Senshi" ("age", "codeName", "firstName", "id", "lastName", "planet") SELECT "age", "codeName", "firstName", "id", "lastName", "planet" FROM "Senshi";
DROP TABLE "Senshi";
ALTER TABLE "new_Senshi" RENAME TO "Senshi";
CREATE UNIQUE INDEX "Senshi_codeName_key" ON "Senshi"("codeName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
