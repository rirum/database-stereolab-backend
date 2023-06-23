import { Router } from 'express';

import { createBrand, getAllBrands, registerModel, registerVersion } from '../controllers/vehicle-controller';

const vehicleRouter = Router();

vehicleRouter.post('/', createBrand);
vehicleRouter.get('/', getAllBrands);
vehicleRouter.post('/model', registerModel);
vehicleRouter.post('/model/version', registerVersion);

export { vehicleRouter };
