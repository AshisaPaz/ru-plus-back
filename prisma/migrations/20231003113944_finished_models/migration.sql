/*
  Warnings:

  - A unique constraint covering the columns `[idUser]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Certificate` (
    `id` VARCHAR(191) NOT NULL,
    `pdf` VARCHAR(191) NOT NULL,
    `validy` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deposit` (
    `id` VARCHAR(191) NOT NULL,
    `history` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `insertedValue` DATETIME(3) NOT NULL,
    `idWalletUser` INTEGER NOT NULL,
    `idMeal` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meal` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Wallet_idUser_key` ON `Wallet`(`idUser`);

-- AddForeignKey
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_idWalletUser_fkey` FOREIGN KEY (`idWalletUser`) REFERENCES `Wallet`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_idMeal_fkey` FOREIGN KEY (`idMeal`) REFERENCES `Meal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
