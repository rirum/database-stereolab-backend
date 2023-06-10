import Joi from 'joi';
import { CreateUserParams } from '../services/users-service';

export const createUserSchema = Joi.object<CreateUserParams>({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  
});


