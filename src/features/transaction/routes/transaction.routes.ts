import { Router } from 'express';
import { GetTransactionHistory } from '~transaction/controllers/transaction/getTransactionHistory';
import { Pay } from '~transaction/controllers/transaction/pay';
import { Withdraw } from '~transaction/controllers/transaction/withdraw';
import axios from 'axios';

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
    this.router.post('/transaction/check-payment-status', Pay.prototype.checkPaymentStatus);

    return this.router;
  }
}

export const transactionRoutes: TransactionRoutes = new TransactionRoutes();
