import { Router } from 'express';

import { createBrand, getAllBrands, registerModel } from '../controllers/vehicle-controller';

const vehicleRouter = Router();

vehicleRouter.post('/', createBrand);
vehicleRouter.get('/', getAllBrands);
vehicleRouter.post('/model', registerModel);

export { vehicleRouter };
