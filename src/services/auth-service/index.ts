import { usuarios, Prisma } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { invalidCredentialError } from "./errors";
import { exclude } from "../../utils/functions/exclude";
import userRepository from "../../repositories/user-repository";
import sessionRepository from "../../repositories/auth-repository";
import { SignInType } from "../../protocols";
import 'dotenv/config';


async function signIn(email: string, password: string):Promise<SignInType>{
    const user = await findEmail(email);
    
   
    
    await validatePassword(password, user.password);
    const token = await createSession(user.id);
    const response = {
        id: user.id,
        email: user.email,
        token
    }

    return response;
}

async function findEmail(email:string){
    const verifyEmail = await userRepository.findByEmail(email);
    if(!verifyEmail){
        throw invalidCredentialError();
    }
    return verifyEmail
}

// async function getUserOrFail(email:string){
//     const user = await userRepository.findByEmail(email);
//     if (!user) throw invalidCredentialError();
//     return user;

// }

async function validatePassword(password: string, userPassword: string){
    const validPassword = await bcrypt.compare(password, userPassword);
   
    if (!validPassword) throw invalidCredentialError();
}

async function createSession(userId: number){
    
    
    const token = jwt.sign({userId}, process.env.JWT_SECRET!);
    const user_id = userId
    await sessionRepository.signIn({
        token,
        user_id,
      });
       
 return token;

}

export type SignInParams = Pick<usuarios,'email' |'password' >;
// export type GetUserOrFailResult = Pick<usuarios, 'id'| 'email'| 'password'>;

type SignInResult = {
    user: Pick<usuarios, 'id' | 'email'>;
    token: string;
};

const authService = {
    signIn,
    createSession,
};

export default authService;
export * from './errors';