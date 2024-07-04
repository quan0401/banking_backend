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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signin = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const http_status_codes_1 = require("http-status-codes");
const auth_model_1 = require("../models/auth.model");
const signin_scheme_1 = require("../schemes/signin.scheme");
const joi_validation_decorator_1 = require("../../../shared/globals/decorators/joi-validation.decorator");
const auth_service_1 = require("../../../shared/services/db/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config");
class Signin {
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = (yield auth_service_1.authService.findUserByEmailOrPhone('', email));
            if (!user)
                throw new ecommerce_shared_1.BadRequestError('User not exists', 'singin');
            const matched = yield auth_model_1.AuthModel.prototype.comparePassword(password, user.password);
            if (!matched) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Invalid Credentials'
                });
                return;
            }
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone
            };
            req.session = { jwt: jsonwebtoken_1.default.sign(payload, config_1.config.JWT_TOKEN) };
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Welcomeback', user });
        });
    }
}
exports.Signin = Signin;
__decorate([
    (0, joi_validation_decorator_1.joiValidation)(signin_scheme_1.loginSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Signin.prototype, "user", null);
//# sourceMappingURL=signin.js.map