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
exports.UpdateAuthInfo = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../../config");
const updateAuthInfo_1 = require("../schemes/updateAuthInfo");
const joi_validation_decorator_1 = require("../../../shared/globals/decorators/joi-validation.decorator");
const auth_service_1 = require("../../../shared/services/db/auth.service");
class UpdateAuthInfo {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { username, cccd, homeAddress, phone, profilePicture } = req.body;
            let response = null;
            if (profilePicture) {
                response = (yield (0, ecommerce_shared_1.uploads)(profilePicture, config_1.config.CLOUD_FOLDER));
                if (!(response === null || response === void 0 ? void 0 : response.public_id))
                    throw new ecommerce_shared_1.BadRequestError('File upload error, please try again!', 'UpdateAuthInfo cloudinary uploads');
            }
            const user = yield auth_service_1.authService.updateAuthInfo(`${(_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id}`, Object.assign({ username,
                cccd,
                homeAddress,
                phone }, ((response === null || response === void 0 ? void 0 : response.public_id) && { profilePicture: response.secure_url })));
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Update auth info successfully', user });
        });
    }
}
exports.UpdateAuthInfo = UpdateAuthInfo;
__decorate([
    (0, joi_validation_decorator_1.joiValidation)(updateAuthInfo_1.updateScheme),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UpdateAuthInfo.prototype, "update", null);
//# sourceMappingURL=updateAuthInfo.js.map