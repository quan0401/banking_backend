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
exports.userSavingService = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const savingPlan_model_1 = require("../../../features/savingPlan/models/savingPlan.model");
const userSaving_model_1 = require("../../../features/userSaving/models/userSaving.model");
class UserSavingService {
    // create (private)
    // topUpMoney
    // withdrawMoney
    // isValidAction (private)
    topUpMoney(userId, savingPlanId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentUserSaving = yield userSaving_model_1.UserSavingModel.findOne({
                where: {
                    userId,
                    savingPlanId
                }
            });
            const savingPlan = yield savingPlan_model_1.SavingPlanModel.findByPk(savingPlanId);
            if (!savingPlan) {
                throw new ecommerce_shared_1.BadRequestError('SavingPlan not Found', 'UserSavingService topUpMoney method');
            }
            //  Create user saving if not exist (topUp for the first time)
            if (!currentUserSaving) {
                const userSavingDoc = {
                    userId,
                    savingPlanId,
                    currency: savingPlan === null || savingPlan === void 0 ? void 0 : savingPlan.dataValues.currency
                };
                currentUserSaving = (yield this.create(userSavingDoc));
            }
            yield this.isValidAction(currentUserSaving.dataValues, savingPlan.dataValues, amount, 'topUp');
            const updated = yield currentUserSaving.update({
                totalAmount: currentUserSaving.dataValues.totalAmount + amount
            });
            return updated.dataValues;
        });
    }
    withdrawMoney(userId, savingPlanId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentUserSaving = yield userSaving_model_1.UserSavingModel.findOne({
                where: {
                    userId,
                    savingPlanId
                }
            });
            const savingPlan = yield savingPlan_model_1.SavingPlanModel.findByPk(savingPlanId);
            // check if savingPlan and userSaving exists
            if (!savingPlan) {
                throw new ecommerce_shared_1.BadRequestError('SavingPlan not Found', 'UserSavingService withdrawMoney method');
            }
            if (!currentUserSaving) {
                throw new ecommerce_shared_1.BadRequestError('UserSaving not Found', 'UserSavingService withdrawMoney method');
            }
            yield this.isValidAction(currentUserSaving.dataValues, savingPlan.dataValues, amount, 'withdraw');
            const updated = yield currentUserSaving.update({
                totalAmount: currentUserSaving.dataValues.totalAmount - amount
            });
            return updated.dataValues;
        });
    }
    create(plan) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPlan = yield userSaving_model_1.UserSavingModel.create(plan);
            return createdPlan;
        });
    }
    isValidAction(currentUserSaving, savingPlan, amount, action) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTotalAmount;
            // savingPlan no longer active
            if (savingPlan.isActive === 0) {
                throw new ecommerce_shared_1.BadRequestError('SavingPlan is no longer active.', 'UserSavingService');
            }
            // check if the topUp currency match the savingPlan
            if (savingPlan.currency !== currentUserSaving.currency) {
                throw new ecommerce_shared_1.BadRequestError('SavingPlan currency and UserSaving must be the same.', 'UserSavingService');
            }
            // check if the transaction satisfies minimumEachTransaction
            if (amount < savingPlan.minimumEachTransaction) {
                throw new ecommerce_shared_1.BadRequestError(`Transaction amount must be greater than saving plan minimumEachTransaction (${savingPlan.minimumEachTransaction} ${savingPlan.currency})`, 'UserSavingService');
            }
            switch (action) {
                case 'topUp':
                    newTotalAmount = currentUserSaving.totalAmount + amount;
                    if (newTotalAmount > savingPlan.maximumBalance) {
                        // return false;
                        throw new ecommerce_shared_1.BadRequestError('UserSaving exceeds the maximum of the saving plan.', 'UserSavingService');
                    }
                    break;
                case 'withdraw':
                    newTotalAmount = currentUserSaving.totalAmount - amount;
                    if (newTotalAmount < 0) {
                        throw new ecommerce_shared_1.BadRequestError("UserSaving can't be negative.", 'UserSavingService');
                    }
                    break;
            }
            return true;
        });
    }
    getUserSaving(userId, savingPlanId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSaving = yield userSaving_model_1.UserSavingModel.findOne({
                where: {
                    userId,
                    savingPlanId
                }
            });
            return userSaving === null || userSaving === void 0 ? void 0 : userSaving.dataValues;
        });
    }
    getUserSavingByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSaving = yield userSaving_model_1.UserSavingModel.findAll({
                where: {
                    userId
                }
            });
            return userSaving.map((saving) => saving.dataValues);
        });
    }
}
exports.userSavingService = new UserSavingService();
//# sourceMappingURL=userSaving.service.js.map