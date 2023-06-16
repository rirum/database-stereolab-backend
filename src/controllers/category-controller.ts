import httpStatus from "http-status";
import categoryService from "../services/category-service";
import { Request, Response } from "express";

export async function createCategory(req: Request, res: Response){
    const {nome} = req.body
    try{
        const result = await categoryService.createCategory({nome})
        return res.status(httpStatus.OK).send(result);
    }catch(error){
        return res.status(httpStatus.UNAUTHORIZED).send({});
    }
}