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
exports.Admin = void 0;
const http_status_codes_1 = require("http-status-codes");
const signin_scheme_1 = require("../schemes/signin.scheme");
const joi_validation_decorator_1 = require("../../../shared/globals/decorators/joi-validation.decorator");
const auth_service_1 = require("../../../shared/services/db/auth.service");
class Admin {
    requestToBecomeAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset } = req.params;
            const result = yield auth_service_1.authService.getUsersPagination(parseInt(`${limit}`), parseInt(`${offset}`));
            res.status(http_status_codes_1.StatusCodes.CREATED).json(Object.assign({ message: 'Get users successfully' }, result));
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield auth_service_1.authService.findUserById(id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Get user successfully',
                user
            });
        });
    }
}
exports.Admin = Admin;
__decorate([
    (0, joi_validation_decorator_1.joiValidation)(signin_scheme_1.loginSchema)
    // get users
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Admin.prototype, "requestToBecomeAdmin", null);
//# sourceMappingURL=admin.js.map