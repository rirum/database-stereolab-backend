import { usuarios } from '@prisma/client';
import bcrypt from 'bcrypt';

import userRepository from '../../repositories/user-repository';
import { duplicatedEmailError } from './errors';

export async function createUser({ nome, email, password }: CreateUserParams): Promise<usuarios> {
  const hashedPassword = await bcrypt.hash(password, 12);

  return userRepository.createUser({
    nome: nome,
    email: email,
    password: hashedPassword
  });
}

export type CreateUserParams = Pick<usuarios, 'nome' | 'email' | 'password'>;

const userService = {
  createUser
};

export * from './errors';
export default userService;
