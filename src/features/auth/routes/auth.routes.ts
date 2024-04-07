import { Router } from 'express';
import { Signup } from '~auth/controllers/signup';
import { AuthModel } from '~auth/models/auth.model';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/signup', Signup.prototype.signup);

    this.router.get('/test', async (req, res) => {
      const result = await AuthModel.findAll();
      res.status(200).json({ message: 'All users', users: result });
    });
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
