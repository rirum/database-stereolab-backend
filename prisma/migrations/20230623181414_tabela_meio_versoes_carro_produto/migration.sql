-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_versao_id_foreign";

-- CreateTable
CREATE TABLE "_versao_carro_produto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_versao_carro_produto_AB_unique" ON "_versao_carro_produto"("A", "B");

-- CreateIndex
CREATE INDEX "_versao_carro_produto_B_index" ON "_versao_carro_produto"("B");

-- AddForeignKey
ALTER TABLE "_versao_carro_produto" ADD CONSTRAINT "_versao_carro_produto_A_fkey" FOREIGN KEY ("A") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_versao_carro_produto" ADD CONSTRAINT "_versao_carro_produto_B_fkey" FOREIGN KEY ("B") REFERENCES "versao_carro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
