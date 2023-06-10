import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/users-service";

export async function userPost(req: Request, res: Response){
    const {nome, password, email} = req.body;
    
    try{
        
        const user = await userService.createUser({nome, email, password});
        
       
        return res.status(httpStatus.CREATED).json({
            id: user.id,
            nome: user.nome,
            email: user.email,
            });
    }catch(error){
        if(error.name === 'DuplicatedEmailError'){
            return res.status(httpStatus.CONFLICT).send(error);
        }
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    
}