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
exports.GetSavingPlan = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const http_status_codes_1 = require("http-status-codes");
const savingPlan_service_1 = require("../../../shared/services/db/savingPlan.service");
class GetSavingPlan {
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const savingPlan = yield savingPlan_service_1.savingPlanService.getSavingPlanById(req.params.planId);
            if (savingPlan === undefined) {
                throw new ecommerce_shared_1.BadRequestError('Saving Plan not found', 'GetSavingPlan');
            }
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Get Saving Plan successfully', savingPlan });
        });
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const savingPlans = yield savingPlan_service_1.savingPlanService.getAllSavingPlan(1);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Get Saving Plans successfully', savingPlans });
        });
    }
}
exports.GetSavingPlan = GetSavingPlan;
//# sourceMappingURL=getSavingPlan.js.map