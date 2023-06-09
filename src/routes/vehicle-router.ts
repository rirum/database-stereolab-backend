import { Router } from 'express';

import {
  createBrand,
  getAllBrands,
  getAllModels,
  registerModel,
  registerVersion,
  getAllVersions,
  getModelsByVehicleId,
  getVersionByModelId
} from '../controllers/vehicle-controller';

const vehicleRouter = Router();

vehicleRouter.post('/', createBrand);
vehicleRouter.get('/', getAllBrands);
vehicleRouter.post('/model', registerModel);
vehicleRouter.get('/model', getAllModels);
vehicleRouter.get('/model/:id', getModelsByVehicleId)
vehicleRouter.post('/model/version', registerVersion);
vehicleRouter.get('/model/version', getAllVersions);
vehicleRouter.get('/model/version/:id', getVersionByModelId)

export { vehicleRouter };
