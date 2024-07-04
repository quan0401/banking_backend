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
exports.GetCurrentUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("../../../shared/services/db/auth.service");
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
class GetCurrentUser {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_service_1.authService.findUserById(req.params.authId);
            if (user) {
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: 'Get current user successfully',
                    user
                });
            }
            else {
                throw new ecommerce_shared_1.NotAuthorizedError('User not found', 'GetCurrentUser');
            }
        });
    }
}
exports.GetCurrentUser = GetCurrentUser;
//# sourceMappingURL=getCurrentUser.js.map