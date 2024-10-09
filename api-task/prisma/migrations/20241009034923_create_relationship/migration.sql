/*
  Warnings:

  - Added the required column `userId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_task" ("createdAt", "finished", "id", "title") SELECT "createdAt", "finished", "id", "title" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
CREATE UNIQUE INDEX "task_id_key" ON "task"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
