import { Router } from "express";

import senshiRoutes from "./v1/senshi.routes";
import familiarRoutes from "./v1/familiar.routes";
import accessoryRoutes from "./v1/accessory.routes";

const router = Router();

export const Routes = (): Router => {
  router.use("/v1/senshis", senshiRoutes);
  router.use("/v1/familiars", familiarRoutes);
  router.use("/v1/accessories", accessoryRoutes);

  return router;
};
