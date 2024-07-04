"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionHistory = void 0;
const http_status_codes_1 = require("http-status-codes");
const transaction_service_1 = require("../../../../shared/services/db/transaction.service");
const transaction_model_1 = require("../../models/transaction.model");
class GetTransactionHistory {
    // TODO:
    // historyPaginate
    // historyByDate
    // withdrawHistoryOnly
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = yield transaction_service_1.transactionService.getAllTransactionsOfUser(req.currentUser.id);
            yield transaction_model_1.TransactionModel.destroy({
                where: {
                    isSuccessful: 0
                }
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: 'Get all trancsactions successfully',
                transactions
            });
        });
    }
    transactionByPlanIdAndUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { savingPlanId } = req.params;
            const transactions = yield transaction_service_1.transactionService.getTransactionsOfUserBySavingPlan(req.currentUser.id, savingPlanId);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: 'Get all trancsactions by PlanId successfully',
                transactions
            });
        });
    }
    transactionsByPlanId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { savingPlanId } = req.params;
            const transactions = yield transaction_service_1.transactionService.getTransactionsOfUserBySavingPlan(req.currentUser.id, savingPlanId);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: 'Get all trancsactions by PlanId successfully',
                transactions
            });
        });
    }
    getTransactionsOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const transactions = yield transaction_service_1.transactionService.getAllTransactionsOfUser(userId);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: 'Get all trancsactions of user successfully',
                transactions
            });
        });
    }
    transactionsByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { startDate, endDate } = req.params;
            const transactions = yield transaction_service_1.transactionService.getTransactionsByDate(req.currentUser.id, new Date(startDate), new Date(endDate));
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: 'Get all trancsactions by date successfully',
                transactions
            });
        });
    }
}
exports.GetTransactionHistory = GetTransactionHistory;
//# sourceMappingURL=getTransactionHistory.js.map