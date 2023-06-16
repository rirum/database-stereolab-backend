import { categoria_produto } from "@prisma/client";
import registerRepository from "../../repositories/category-repository";
import { notFoundError } from "../../errors/not-found-error";


async function createCategory(params: CreateCategoryParams ){
    const category = await registerRepository.registerCategory(params.nome);
    if (!category) throw notFoundError();

    return category;
}


export type CreateCategoryParams = {nome: string}

const categoryService = {
    createCategory
}


    export default categoryService;