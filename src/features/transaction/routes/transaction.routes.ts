import { Router } from 'express';
import { Signin } from '~auth/controllers/signin';
import { Signup } from '~auth/controllers/signup';
import { VerifyEmail } from '~auth/controllers/verfiy-email';
import { AuthModel } from '~auth/models/auth.model';
import { GetTransactionHistory } from '~transaction/controllers/transaction/getTransactionHistory';
import { Pay } from '~transaction/controllers/transaction/pay';
import { Withdraw } from '~transaction/controllers/transaction/withdraw';

class TransactionRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/transaction/pay/:savingPlanId', Pay.prototype.pay);
    this.router.post('/transaction/withdraw/:savingPlanId', Withdraw.prototype.withdraw);
    this.router.get('/transaction/savingPlan/:savingPlanId', GetTransactionHistory.prototype.transactionsByPlanId);
    this.router.get('/transaction/all', GetTransactionHistory.prototype.all);

    return this.router;
  }
}

export const transactionRoutes: TransactionRoutes = new TransactionRoutes();
