import { Router } from "express";
import { validateBody } from "../middlewares/validation.middleware";
import { userPost} from "../controllers/user-controller";
import { createUserSchema } from "../schemas/user-schemas";

const userRouter = Router();

userRouter.post('/', validateBody(createUserSchema), userPost);

export {userRouter};
