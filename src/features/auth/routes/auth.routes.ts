import { Router } from 'express';
import { GetCurrentUser } from '~auth/controllers/getCurrentUser';
import { Signin } from '~auth/controllers/signin';
import { Signout } from '~auth/controllers/signout';
import { Signup } from '~auth/controllers/signup';
import { VerifyEmail } from '~auth/controllers/verfiy-email';
import { AuthModel } from '~auth/models/auth.model';
import { verifyUser } from '~global/helpers/auth-middleware';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/signup', Signup.prototype.signup);
    this.router.post('/signin', Signin.prototype.user);
    this.router.post('/signout', Signout.prototype.update);
    this.router.post('/verify-email', VerifyEmail.prototype.verify);
    // protected routes
    this.router.get('/auth/currentUser/:authId', verifyUser, GetCurrentUser.prototype.get);

    this.router.get('/test', async (req, res) => {
      const result = await AuthModel.findAll();
      res.status(200).json({ message: 'All users', users: result });
    });
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
