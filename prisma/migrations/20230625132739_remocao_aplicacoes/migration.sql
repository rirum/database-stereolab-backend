/*
  Warnings:

  - You are about to drop the `aplicacoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_aplicacoes_id_foreign";

-- DropTable
DROP TABLE "aplicacoes";
