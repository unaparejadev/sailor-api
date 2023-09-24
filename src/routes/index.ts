import { Router } from 'express';

import senshiRoutes from './v1/senshi.routes';

const router = Router();

export const Routes = (): Router => {
  router.use('/v1/senshis', senshiRoutes);

  return router;
};
