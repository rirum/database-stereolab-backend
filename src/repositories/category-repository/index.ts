import { categoria_produto } from "@prisma/client";
import prisma from "../../configs/database.connection";

async function registerCategory(nome: string){
    const category = await prisma.categoria_produto.create({
        data:{
            nome: nome,
        },
    });
    return category
}

const registerRepository = {
    registerCategory
  };

export default registerRepository;