import { Prisma } from "@prisma/client";
import  prisma  from "../../configs/database.connection";

async function signIn(data: Prisma.sessaoUncheckedCreateInput){
    return prisma.sessao.create({
        data,
    });
}

const sessionRepository = {
    signIn,
}

export default sessionRepository;