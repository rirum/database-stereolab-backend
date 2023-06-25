/*
  Warnings:

  - You are about to drop the column `codigo_fabricante_2` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `codigo_fabricante_3` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `imagem2` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `imagem3` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `instalada` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `medidas` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `precoCusto` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `precoFinal` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `observacoes` on the `versao_carro` table. All the data in the column will be lost.
  - You are about to drop the `_versao_carro_produto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `versao_carro_produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_versao_carro_produto" DROP CONSTRAINT "_versao_carro_produto_A_fkey";

-- DropForeignKey
ALTER TABLE "_versao_carro_produto" DROP CONSTRAINT "_versao_carro_produto_B_fkey";

-- DropForeignKey
ALTER TABLE "versao_carro_produto" DROP CONSTRAINT "versao_carro_produto_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "versao_carro_produto" DROP CONSTRAINT "versao_carro_produto_versaoCarroId_fkey";

-- AlterTable
ALTER TABLE "produto" DROP COLUMN "codigo_fabricante_2",
DROP COLUMN "codigo_fabricante_3",
DROP COLUMN "createdAt",
DROP COLUMN "imagem2",
DROP COLUMN "imagem3",
DROP COLUMN "instalada",
DROP COLUMN "medidas",
DROP COLUMN "precoCusto",
DROP COLUMN "precoFinal",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "versao_carro" DROP COLUMN "observacoes";

-- DropTable
DROP TABLE "_versao_carro_produto";

-- DropTable
DROP TABLE "versao_carro_produto";

-- CreateTable
CREATE TABLE "versao_produtos" (
    "id" SERIAL NOT NULL,
    "versao_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,

    CONSTRAINT "versao_produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "versao_produtos" ADD CONSTRAINT "versao_produtos_produto_id_foreign" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "versao_produtos" ADD CONSTRAINT "versao_produtos_versao_id_foreign" FOREIGN KEY ("versao_id") REFERENCES "versao_carro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
