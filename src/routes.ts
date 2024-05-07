import { Application } from 'express';
import { authRoutes } from '~auth/routes/auth.routes';
import { verifyUser } from '~global/helpers/auth-middleware';
import { savingPlanRoutes } from '~savingPlan/routes/savingPlan.routes';

const BASE_URL = '/api/v1';
export default (app: Application) => {
  const routes = () => {
    app.use(BASE_URL, authRoutes.routes());
    // Verified routes
    app.use(BASE_URL, verifyUser, savingPlanRoutes.routes());
  };
  routes();
};
