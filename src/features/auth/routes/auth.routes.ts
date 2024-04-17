import { Request, Router } from 'express';
import { Signin } from '~auth/controllers/signin';
import { Signup } from '~auth/controllers/signup';
import { AuthModel } from '~auth/models/auth.model';
import { SavingPlan } from '~auth/models/savingPlan.model';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/signup', Signup.prototype.signup);
    this.router.post('/signin', Signin.prototype.user);

    this.router.get('/test', async (req, res) => {
      const result = await AuthModel.findAll();
      res.status(200).json({ message: 'All users', users: result });
    });

    this.router.post('/saving', async (req, res) => {
      const result = await SavingPlan.create({
        schedule: Date.now(),
        interestRate: 20,
        minimumMoney: 30
      });
      console.log({ result });
      res.status(200).json({
        message: 'test saving plan'
      });
    });
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
