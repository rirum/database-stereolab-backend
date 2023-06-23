export type CreateProductParams = {
  nome: string;
  codigo_produto: string;
  marca_produto: string;
  codigo_fabricante: string;
  codigo_fabricante_3?: string;
  codigo_fabricante_2?: string;
  categoria_produto_id: number;
  aplicacoes_id: number;
  createdAt: Date;
  updatedAt: Date;
  observacoes?: string;
  acessorios_id: number;
  precoFinal?: number;
  precoCusto?: number;
  imagem?: string;
  imagem2?: string;
  link?: string;
  imagem3?: string;
  instalada?: string;
  medidas?: string;
  versoes_carro?: {
    connect: { id: number }[];
  };
};
