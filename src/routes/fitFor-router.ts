import { Router } from 'express';

import { createFitFor } from '../controllers/fitFor-controller';

const fitForRouter = Router();

fitForRouter.post('/', createFitFor);

export { fitForRouter };
