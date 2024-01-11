/*
  Warnings:

  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `hashedPassword` VARCHAR(191) NOT NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;
