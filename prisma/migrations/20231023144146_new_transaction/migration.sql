/*
  Warnings:

  - The primary key for the `meal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `insertedValue` on the `transaction` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `certificate` DROP FOREIGN KEY `Certificate_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `deposit` DROP FOREIGN KEY `Deposit_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_idMeal_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_idWalletUser_fkey`;

-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `Wallet_idUser_fkey`;

-- AlterTable
ALTER TABLE `certificate` MODIFY `idUser` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `deposit` MODIFY `idUser` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `meal` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `insertedValue`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `idWalletUser` VARCHAR(191) NOT NULL,
    MODIFY `idMeal` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `wallet` MODIFY `idUser` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_idWalletUser_fkey` FOREIGN KEY (`idWalletUser`) REFERENCES `Wallet`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_idMeal_fkey` FOREIGN KEY (`idMeal`) REFERENCES `Meal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
