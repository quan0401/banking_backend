"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Withdraw = void 0;
const http_status_codes_1 = require("http-status-codes");
const joi_validation_decorator_1 = require("../../../../shared/globals/decorators/joi-validation.decorator");
const transaction_service_1 = require("../../../../shared/services/db/transaction.service");
const transaction_scheme_1 = require("../../schemes/transaction.scheme");
class Withdraw {
    withdraw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { savingPlanId } = req.params;
            const { bankAccountId, amount, transactionType } = req.body;
            const transactionDoc = {
                userId: req.currentUser.id,
                bankAccountId,
                amount,
                savingPlanId,
                transactionDate: new Date(),
                transactionType
            };
            const result = yield transaction_service_1.transactionService.withdraw(transactionDoc);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: 'WithDraw successfully',
                result
            });
        });
    }
}
exports.Withdraw = Withdraw;
__decorate([
    (0, joi_validation_decorator_1.joiValidation)(transaction_scheme_1.transactionScheme),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Withdraw.prototype, "withdraw", null);
//# sourceMappingURL=withdraw.js.map