import { Application, Router } from 'express';
import { authRoutes } from '~auth/routes/auth.routes';

const BASE_URL = '/api/v1';

export const appRoutes = (app: Application): void => {
  const router: Router = Router();
  // define routes herer
  router.use(`${BASE_URL}`, authRoutes.routes());

  app.use(router);
};
