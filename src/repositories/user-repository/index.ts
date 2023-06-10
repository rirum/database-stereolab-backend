import { Prisma } from "@prisma/client";
import { prisma } from "../../configs";

async function createUser(data: Prisma.usuariosUncheckedCreateInput){
 
    return prisma.usuarios.create({
        data,
    });
}

async function findByEmail(email: string){
    const params = {
        where:{
            email,
        },
    };
    return prisma.usuarios.findUnique(params);
}

const userRepository = {
    createUser,
    findByEmail,
};

export default userRepository;