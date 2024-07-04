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
exports.VerifyEmail = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const http_status_codes_1 = require("http-status-codes");
const verfiy_email_scheme_1 = require("../schemes/verfiy-email.scheme");
const joi_validation_decorator_1 = require("../../../shared/globals/decorators/joi-validation.decorator");
const auth_service_1 = require("../../../shared/services/db/auth.service");
class VerifyEmail {
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            const user = yield auth_service_1.authService.findUserByEmailToken(token);
            if (!user) {
                throw new ecommerce_shared_1.BadRequestError('Verification token is either invalid or is already used.', 'VerifyEmail verify method error');
            }
            const updated = yield auth_service_1.authService.updateVerifyEmail(user.id, 1);
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Verify Email successfully', user: updated });
        });
    }
}
exports.VerifyEmail = VerifyEmail;
__decorate([
    (0, joi_validation_decorator_1.joiValidation)(verfiy_email_scheme_1.verifyEmailScheme),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VerifyEmail.prototype, "verify", null);
//# sourceMappingURL=verfiy-email.js.map