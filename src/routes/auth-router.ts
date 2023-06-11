import { Router } from "express";
import { signIn } from "../controllers/auth-controller";
import { validateBody } from "../middlewares/validation.middleware";
import { signInSchema } from "../schemas/auth-schema";

const authRouter = Router();

authRouter.post('/', validateBody(signInSchema), signIn);

export {authRouter}