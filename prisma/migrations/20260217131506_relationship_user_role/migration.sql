/*
  Warnings:

  - Made the column `name` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roleId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_roleId_fkey`;

-- DropIndex
DROP INDEX `users_roleId_fkey` ON `users`;

-- AlterTable
ALTER TABLE `roles` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `roleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
