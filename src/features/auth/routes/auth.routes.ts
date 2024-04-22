

import { Request, Router } from 'express';
import { Signin } from '~auth/controllers/signin';
import { Signup } from '~auth/controllers/signup';
import { Saving } from '~auth/controllers/saving';
import { AuthModel } from '~auth/models/auth.model';
import { SavingPlan } from '~auth/models/savingPlan.model';
import { UserSaving } from '~auth/models/userSaving.model';
import { ISaving } from '~auth/interfaces/userSaving.interface';


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

    this.router.post('/savingplan', async (req, res) => {
      const result = await SavingPlan.create({
        typeID: 'KH6',
        termDeposit: 6,
        interestRate: 0.055,
      });
      console.log({ result });
      res.status(200).json({
        message: 'test saving plan'
      });
    });

    this.router.post('/opensaving', Saving.prototype.createSaving);
    this.router.put('/withdraw', Saving.prototype.updateBalanceWithdraw);
    this.router.put('/deposit', Saving.prototype.updateBalanceDeposit);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
