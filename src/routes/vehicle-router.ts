import { Router } from 'express';

import {
  createBrand,
  getAllBrands,
  getAllModels,
  registerModel,
  registerVersion,
  getAllVersions
} from '../controllers/vehicle-controller';

const vehicleRouter = Router();

vehicleRouter.post('/', createBrand);
vehicleRouter.get('/', getAllBrands);
vehicleRouter.post('/model', registerModel);
vehicleRouter.get('/model', getAllModels);
vehicleRouter.post('/model/version', registerVersion);
vehicleRouter.get('/model/version', getAllVersions);

export { vehicleRouter };
