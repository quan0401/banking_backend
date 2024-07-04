"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankRoutes = void 0;
const express_1 = require("express");
const addBankAccount_1 = require("../controllers/bankAccount/addBankAccount");
const deleteBankAccount_1 = require("../controllers/bankAccount/deleteBankAccount");
const getBankAccount_1 = require("../controllers/bankAccount/getBankAccount");
const updateBankAccount_1 = require("../controllers/bankAccount/updateBankAccount");
class BankRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.post('/bankAccount', addBankAccount_1.AddBankAccount.prototype.add);
        this.router.get('/bankAccount/:bankAccountId', getBankAccount_1.GetBankAccount.prototype.byId);
        this.router.get('/bankAccount', getBankAccount_1.GetBankAccount.prototype.allAccountsOfUser);
        this.router.delete('/bankAccount/delete/all', deleteBankAccount_1.DeleteBankAccount.prototype.allAccountsOfUser);
        this.router.delete('/bankAccount/:bankAccountId', deleteBankAccount_1.DeleteBankAccount.prototype.byId);
        this.router.put('/bankAccount/:bankAccountId', updateBankAccount_1.UpdateBankAccount.prototype.byId);
        return this.router;
    }
}
exports.bankRoutes = new BankRoutes();
//# sourceMappingURL=bank.routes.js.map