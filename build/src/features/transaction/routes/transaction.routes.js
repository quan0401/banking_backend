"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = require("express");
const getTransactionHistory_1 = require("../controllers/transaction/getTransactionHistory");
const pay_1 = require("../controllers/transaction/pay");
const withdraw_1 = require("../controllers/transaction/withdraw");
class TransactionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.post('/transaction/check-payment-status', pay_1.Pay.prototype.checkPaymentStatus);
        this.router.post('/transaction/pay/:savingPlanId', pay_1.Pay.prototype.pay);
        this.router.post('/transaction/withdraw/:savingPlanId', withdraw_1.Withdraw.prototype.withdraw);
        this.router.get('/transaction/all/savingPlan/:savingPlanId/user', getTransactionHistory_1.GetTransactionHistory.prototype.transactionByPlanIdAndUserId);
        this.router.get('/transaction/byDate/:startDate/:endDate', getTransactionHistory_1.GetTransactionHistory.prototype.transactionsByDate);
        this.router.get('/transaction/savingPlan/:savingPlanId', getTransactionHistory_1.GetTransactionHistory.prototype.transactionsByPlanId);
        this.router.get('/transaction/user/:userId', getTransactionHistory_1.GetTransactionHistory.prototype.getTransactionsOfUser);
        this.router.get('/transaction/all', getTransactionHistory_1.GetTransactionHistory.prototype.all);
        return this.router;
    }
}
exports.transactionRoutes = new TransactionRoutes();
//# sourceMappingURL=transaction.routes.js.map