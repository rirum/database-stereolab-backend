-- CreateTable
CREATE TABLE "acessorios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "codigo_acessorio" TEXT,
    "marca_acessorio" TEXT,
    "codigo_fabricante_acessorio" TEXT,
    "codigo_fabricante_acessorio_2" TEXT,
    "codigo_fabricante_acessorio_3" TEXT,
    "imagem" TEXT,
    "imagem2" TEXT,
    "imagem3" TEXT,
    "medidas" TEXT,
    "link" TEXT,
    "instalada" TEXT,

    CONSTRAINT "acessorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aplicacoes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,

    CONSTRAINT "aplicacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria_produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categoria_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marca_carro" (
    "id" SERIAL NOT NULL,
    "imagem" TEXT,
    "nome" TEXT NOT NULL,

    CONSTRAINT "marca_carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_carro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marca_id" INTEGER NOT NULL,
    "imagem" TEXT,

    CONSTRAINT "modelo_carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo_produto" TEXT NOT NULL,
    "marca_produto" TEXT NOT NULL,
    "codigo_fabricante" TEXT NOT NULL,
    "codigo_fabricante_3" TEXT,
    "codigo_fabricante_2" TEXT,
    "versao_id" INTEGER NOT NULL,
    "categoria_produto_id" INTEGER NOT NULL,
    "aplicacoes_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "observacoes" TEXT,
    "acessorios_id" INTEGER NOT NULL,
    "precoFinal" DECIMAL(8,2),
    "precoCusto" DECIMAL(8,2),
    "imagem" TEXT,
    "imagem2" TEXT,
    "link" TEXT,
    "imagem3" TEXT,
    "instalada" TEXT,
    "medidas" TEXT,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "versao_carro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "modelo_id" INTEGER NOT NULL,

    CONSTRAINT "versao_carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessao" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "sessao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoria_produto_nome_unique" ON "categoria_produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "marca_carro_nome_unique" ON "marca_carro"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "modelo_carro_nome_unique" ON "modelo_carro"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_unique" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "versao_carro_nome_unique" ON "versao_carro"("nome");

-- AddForeignKey
ALTER TABLE "modelo_carro" ADD CONSTRAINT "modelo_carro_marca_id_foreign" FOREIGN KEY ("marca_id") REFERENCES "marca_carro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_acessorios_id_foreign" FOREIGN KEY ("acessorios_id") REFERENCES "acessorios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_aplicacoes_id_foreign" FOREIGN KEY ("aplicacoes_id") REFERENCES "aplicacoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_categoria_produto_id_foreign" FOREIGN KEY ("categoria_produto_id") REFERENCES "categoria_produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_versao_id_foreign" FOREIGN KEY ("versao_id") REFERENCES "versao_carro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "versao_carro" ADD CONSTRAINT "versao_carro_modelo_id_foreign" FOREIGN KEY ("modelo_id") REFERENCES "modelo_carro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessao" ADD CONSTRAINT "sessao_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
