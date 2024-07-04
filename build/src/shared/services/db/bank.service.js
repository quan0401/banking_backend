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
exports.bankService = void 0;
const bankAccount_model_1 = require("../../../features/transaction/models/bankAccount.model");
class BankService {
    // getAllUserBankAccount
    // getBankAccountById
    // deleteBankAccountById
    // deleteAllBankAccountsOfUser
    // updateBankAccount
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield bankAccount_model_1.BankAccountModel.create(data);
            return created.dataValues;
        });
    }
    getAllUserBankAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = (yield bankAccount_model_1.BankAccountModel.findAll({
                where: {
                    userId
                }
            })).map((account) => account.dataValues);
            return accounts;
        });
    }
    getBankAccountById(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield bankAccount_model_1.BankAccountModel.findOne({
                where: {
                    id: accountId
                }
            });
            return account === null || account === void 0 ? void 0 : account.dataValues;
        });
    }
    deleteBankAccountById(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield bankAccount_model_1.BankAccountModel.findByPk(accountId);
            if (account)
                yield account.destroy();
        });
    }
    deleteAllBankAccountsOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield bankAccount_model_1.BankAccountModel.findAll({
                where: {
                    userId
                }
            })).forEach((account) => __awaiter(this, void 0, void 0, function* () {
                yield account.destroy();
            }));
        });
    }
    updateBankAccount(bankAccountId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield bankAccount_model_1.BankAccountModel.findByPk(bankAccountId);
            if (account)
                yield account.update(data);
            return account === null || account === void 0 ? void 0 : account.dataValues;
        });
    }
}
exports.bankService = new BankService();
//# sourceMappingURL=bank.service.js.map