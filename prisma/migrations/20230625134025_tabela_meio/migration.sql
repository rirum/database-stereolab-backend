-- CreateTable
CREATE TABLE "versao_carro_produto" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "versaoCarroId" INTEGER NOT NULL,

    CONSTRAINT "versao_carro_produto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "versao_carro_produto_produtoId_versaoCarroId_key" ON "versao_carro_produto"("produtoId", "versaoCarroId");

-- AddForeignKey
ALTER TABLE "versao_carro_produto" ADD CONSTRAINT "versao_carro_produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "versao_carro_produto" ADD CONSTRAINT "versao_carro_produto_versaoCarroId_fkey" FOREIGN KEY ("versaoCarroId") REFERENCES "versao_carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
