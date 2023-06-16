import { Router } from "express";
import { createCategory } from "../controllers/category-controller";

const categoryRouter = Router();

categoryRouter.post('/',  createCategory);

export {categoryRouter}