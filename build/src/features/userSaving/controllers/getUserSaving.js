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
exports.GetUserSaving = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const http_status_codes_1 = require("http-status-codes");
const userSaving_service_1 = require("../../../shared/services/db/userSaving.service");
class GetUserSaving {
    getBySavingPlanId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, savingPlanId } = request.params;
            const userSaving = yield userSaving_service_1.userSavingService.getUserSaving(userId, savingPlanId);
            response.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Get user saving successfully', userSaving });
        });
    }
    getByUserId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = request.params;
            if (!userId) {
                throw new ecommerce_shared_1.BadRequestError('User ID is required', 'GetUserSaving getByUserId');
            }
            const userSavings = yield userSaving_service_1.userSavingService.getUserSavingByUserId(userId);
            response.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Get user saving successfully', userSavings });
        });
    }
}
exports.GetUserSaving = GetUserSaving;
//# sourceMappingURL=getUserSaving.js.map