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
exports.GetBankAccount = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const http_status_codes_1 = require("http-status-codes");
const bank_service_1 = require("../../../../shared/services/db/bank.service");
class GetBankAccount {
    allAccountsOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield bank_service_1.bankService.getAllUserBankAccount(req.currentUser.id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Get all bank accounts of user successfully',
                bankAccounts: accounts
            });
        });
    }
    byId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield bank_service_1.bankService.getBankAccountById(req.params.bankAccountId);
            if (account === undefined) {
                throw new ecommerce_shared_1.BadRequestError('BankAccount not found', 'GetBankAccount');
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Get bank account successfully',
                bankAccount: account
            });
        });
    }
}
exports.GetBankAccount = GetBankAccount;
//# sourceMappingURL=getBankAccount.js.map