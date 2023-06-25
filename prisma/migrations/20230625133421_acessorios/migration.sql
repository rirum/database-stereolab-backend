/*
  Warnings:

  - You are about to drop the column `acessorios_id` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `aplicacoes_id` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the `acessorios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_acessorios_id_foreign";

-- AlterTable
ALTER TABLE "produto" DROP COLUMN "acessorios_id",
DROP COLUMN "aplicacoes_id";

-- DropTable
DROP TABLE "acessorios";
