import { Application } from 'express';
import { authRoutes } from '~auth/routes/auth.routes';

const BASE_URL = '/api/v1';
export default (app: Application) => {
  const routes = () => {
    app.use(BASE_URL, authRoutes.routes());
  };
  routes();
};
