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
exports.savingPlanService = void 0;
const savingPlan_model_1 = require("../../../features/savingPlan/models/savingPlan.model");
class SavingPlanService {
    create(plan) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPlan = yield savingPlan_model_1.SavingPlanModel.create(plan);
            return createdPlan.dataValues;
        });
    }
    getAllSavingPlan(isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const savingPlans = (yield savingPlan_model_1.SavingPlanModel.findAll({
                where: {
                    isActive
                }
            })).map((model) => model.dataValues);
            return savingPlans;
        });
    }
    getSavingPlanById(planId) {
        return __awaiter(this, void 0, void 0, function* () {
            const savingPlan = yield savingPlan_model_1.SavingPlanModel.findOne({
                where: {
                    id: planId
                }
            });
            return savingPlan === null || savingPlan === void 0 ? void 0 : savingPlan.dataValues;
        });
    }
    updateSavingPlanById(planId, planDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            const savingPlan = yield savingPlan_model_1.SavingPlanModel.findByPk(planId);
            if (!savingPlan) {
                return;
            }
            const updatedSavingPlan = yield savingPlan.update(planDoc);
            return updatedSavingPlan === null || updatedSavingPlan === void 0 ? void 0 : updatedSavingPlan.dataValues;
        });
    }
    deleteSavingPlanById(planId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield savingPlan_model_1.SavingPlanModel.destroy({
                where: {
                    id: planId
                }
            });
        });
    }
}
exports.savingPlanService = new SavingPlanService();
//# sourceMappingURL=savingPlan.service.js.map