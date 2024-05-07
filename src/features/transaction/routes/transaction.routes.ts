import { Router } from 'express';
import { Signin } from '~auth/controllers/signin';
import { Signup } from '~auth/controllers/signup';
import { VerifyEmail } from '~auth/controllers/verfiy-email';
import { AuthModel } from '~auth/models/auth.model';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/signup', Signup.prototype.signup);
    this.router.post('/signin', Signin.prototype.user);
    this.router.post('/verify-email', VerifyEmail.prototype.verify);

    this.router.get('/test', async (req, res) => {
      const result = await AuthModel.findAll();
      res.status(200).json({ message: 'All users', users: result });
    });
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
