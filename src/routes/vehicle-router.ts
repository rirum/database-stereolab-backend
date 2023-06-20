import { Router } from 'express';

import { createBrand, getAllBrands } from '../controllers/vehicle-controller';

const vehicleRouter = Router();

vehicleRouter.post('/', createBrand);
vehicleRouter.get('/', getAllBrands);

export { vehicleRouter };
