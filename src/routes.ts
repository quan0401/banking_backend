import { Application } from 'express';
import { authRoutes } from '~auth/routes/auth.routes';
import { verifyUser } from '~global/helpers/auth-middleware';
import { savingPlanRoutes } from '~savingPlan/routes/savingPlan.routes';
import { bankRoutes } from '~transaction/routes/bank.routes';
import { transactionRoutes } from '~transaction/routes/transaction.routes';

const BASE_URL = '/api/v1';
export default (app: Application) => {
  const routes = () => {
    app.use(BASE_URL, authRoutes.routes());
    // Verified routes
    app.use(BASE_URL, verifyUser, savingPlanRoutes.routes());
    app.use(BASE_URL, verifyUser, bankRoutes.routes());
    app.use(BASE_URL, verifyUser, transactionRoutes.routes());
  };
  routes();
};
