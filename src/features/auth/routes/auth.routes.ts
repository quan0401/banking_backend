import { Router } from 'express';
import { Signup } from '~auth/controllers/signup';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/signup', Signup.prototype.signup);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
