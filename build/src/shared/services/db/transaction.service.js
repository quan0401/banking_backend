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
exports.transactionService = void 0;
const sequelize_1 = require("sequelize"); // Import ValidationError from Sequelize
const transaction_model_1 = require("../../../features/transaction/models/transaction.model");
const userSaving_service_1 = require("../db/userSaving.service");
const bankAccount_model_1 = require("../../../features/transaction/models/bankAccount.model");
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
class TransactionService {
    // makePayment
    // withdraw
    // scheduleTransaction
    // cacnelScheduledTransaction
    makePayment(transactionDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (transactionDoc.transactionType !== 1) {
                throw new ecommerce_shared_1.BadRequestError('TransactionType must be 1 for make payment and 0 for withdraw', 'TransactionService makePayment');
            }
            // const bankAccount: Model | null = await BankAccountModel.findByPk(transactionDoc.bankAccountId);
            // if (bankAccount === null) {
            //   throw new BadRequestError('Bank Account not exists', 'TransactionService makePayment');
            // }
            // const updatedUserSaving: IUserSavingDocument = await userSavingService.topUpMoney(
            //   transactionDoc.userId,
            //   transactionDoc.savingPlanId,
            //   transactionDoc.amount
            // );
            // TODO: make hanlder for isSuccessful
            const createdTransaction = yield transaction_model_1.TransactionModel.create(Object.assign(Object.assign({}, transactionDoc), { isSuccessful: 0 }));
            return {
                transaction: createdTransaction.dataValues
            };
        });
    }
    markPaymentStatus(userId, transactionId, savingPlanId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status === 1) {
                const transaction = yield transaction_model_1.TransactionModel.findOne({
                    where: {
                        userId,
                        savingPlanId,
                        id: transactionId,
                        isSuccessful: 0
                    }
                });
                if (!transaction)
                    return;
                const updated = yield transaction_model_1.TransactionModel.update({
                    isSuccessful: status
                }, {
                    where: {
                        userId,
                        savingPlanId,
                        id: transactionId
                    }
                });
                if (updated[0] === 0)
                    return;
                const userSaving = yield userSaving_service_1.userSavingService.topUpMoney(userId, savingPlanId, transaction.dataValues.amount);
                return { transaction: transaction.dataValues, userSaving };
            }
        });
    }
    makePaymentWithMomo(transactionDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (transactionDoc.transactionType !== 1) {
                throw new ecommerce_shared_1.BadRequestError('TransactionType must be 1 for make payment and 0 for withdraw', 'TransactionService makePayment');
            }
            const updatedUserSaving = yield userSaving_service_1.userSavingService.topUpMoney(transactionDoc.userId, transactionDoc.savingPlanId, transactionDoc.amount);
            // TODO: make hanlder for isSuccessful
            const createdTransaction = yield transaction_model_1.TransactionModel.create(Object.assign(Object.assign({}, transactionDoc), { isSuccessful: 1 }));
            return {
                transaction: createdTransaction.dataValues,
                userSaving: updatedUserSaving
            };
        });
    }
    withdraw(transactionDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (transactionDoc.transactionType !== -1) {
                throw new ecommerce_shared_1.BadRequestError('TransactionType must be -1 for withdrawal', 'TransactionService makePayment');
            }
            const bankAccount = yield bankAccount_model_1.BankAccountModel.findByPk(transactionDoc.bankAccountId);
            if (bankAccount === null) {
                throw new ecommerce_shared_1.BadRequestError('Bank Account not exists', 'TransactionService makePayment');
            }
            const updatedUserSaving = yield userSaving_service_1.userSavingService.withdrawMoney(transactionDoc.userId, transactionDoc.savingPlanId, transactionDoc.amount);
            // TODO: make hanlder for isSuccessful
            const createdTransaction = yield transaction_model_1.TransactionModel.create(Object.assign(Object.assign({}, transactionDoc), { isSuccessful: 1 }));
            return {
                transaction: createdTransaction.dataValues,
                userSaving: updatedUserSaving
            };
        });
    }
    getAllTransactionsOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = (yield transaction_model_1.TransactionModel.findAll({
                where: {
                    userId
                },
                order: [['transactionDate', 'DESC']]
            })).map((tran) => tran.dataValues);
            return transactions;
        });
    }
    getTransactionsOfUserBySavingPlan(userId, savingPlanId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = (yield transaction_model_1.TransactionModel.findAll({
                where: {
                    userId,
                    savingPlanId
                },
                order: [['transactionDate', 'DESC']]
            })).map((tran) => {
                const value = tran.dataValues;
                return value;
            });
            return transactions;
        });
    }
    getTransactionsByDate(userId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set startDate to the beginning of the day
            startDate.setHours(0, 0, 0, 0);
            // Set endDate to the end of the day
            endDate.setHours(23, 59, 59, 999);
            const transactions = (yield transaction_model_1.TransactionModel.findAll({
                where: {
                    userId,
                    transactionDate: {
                        [sequelize_1.Op.between]: [startDate, endDate]
                    }
                },
                order: [['transactionDate', 'DESC']]
            })).map((tran) => tran.dataValues);
            return transactions;
        });
    }
}
exports.transactionService = new TransactionService();
//# sourceMappingURL=transaction.service.js.map