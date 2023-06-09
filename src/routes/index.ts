import { Router } from 'express';

// import router1 from './router1';
// import router2 from './router2';
// import router3 from './router3';
import { authRouter } from './auth-router';
import { categoryRouter } from './category-router';
import { fitForRouter } from './fitFor-router';
import { productRouter } from './product-router';
import { userRouter } from './user-router';
import { vehicleRouter } from './vehicle-router';

const routes = Router();
// routes.use('/example1', router1);
// routes.use('/example2', router2);
// routes.use('/example3', router3);
routes.use('/user', userRouter);
routes.use('/sign-in', authRouter);
routes.use('/category', categoryRouter);
routes.use('/vehicle', vehicleRouter);
routes.use('/product', productRouter);
routes.use('/fitfor', fitForRouter);

export default routes;
