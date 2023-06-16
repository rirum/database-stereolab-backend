import { Router } from 'express';
// import router1 from './router1';
// import router2 from './router2';
// import router3 from './router3';
import { userRouter } from './user-router';
import { authRouter } from './auth-router';
import { categoryRouter } from './category-router';

const routes = Router();
// routes.use('/example1', router1);
// routes.use('/example2', router2);
// routes.use('/example3', router3);
routes.use('/user', userRouter);
routes.use('/sign-in', authRouter);
routes.use('/category', categoryRouter);

export default routes;
