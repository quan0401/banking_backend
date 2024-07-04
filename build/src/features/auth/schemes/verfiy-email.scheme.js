"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const verifyEmailScheme = joi_1.default.object().keys({
    token: joi_1.default.string().required().messages({
        'string.base': 'Token must be of type string',
        'string.token': 'Invalid token',
        'string.empty': 'Token is a required field'
    })
});
exports.verifyEmailScheme = verifyEmailScheme;
//# sourceMappingURL=verfiy-email.scheme.js.map