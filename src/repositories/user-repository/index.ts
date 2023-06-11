
import prisma from '../../configs/database.connection';

async function createUser(data: prisma.usuariosCreateInput) {
  return prisma.usuarios.create({
    data
  });
}

async function findByEmail(email: string) {
  const params = {
    where: {
      email
    }
  };
  return prisma.usuarios.findUnique(params);
}

const userRepository = {
  createUser,
  findByEmail
};

export default userRepository;
