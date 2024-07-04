"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const updateScheme = joi_1.default.object().keys({
    username: joi_1.default.string().min(4).max(12).required().messages({
        'string.base': 'Username must be of type string',
        'string.min': 'Username must be at least 4 characters',
        'string.max': 'Username must be at most 12 characters',
        'string.empty': 'Username is a required field'
    }),
    cccd: joi_1.default.string().required().messages({
        'string.base': 'CCCD must be of type string',
        'string.empty': 'CCCD is a required field'
    }),
    homeAddress: joi_1.default.string().required().messages({
        'string.base': 'Home Address must be of type string',
        'string.empty': 'Home Address is a required field'
    }),
    phone: joi_1.default.string().min(10).required().pattern(/^\d+$/).messages({
        'string.base': 'Phone number must be of type string',
        'string.pattern.base': 'Invalid phone number, only digits are allowed',
        'string.empty': 'Phone number is a required field'
    }),
    profilePicture: joi_1.default.string().optional().allow('', null).messages({
        'string.base': 'Profile picture must be of type string',
        'string.empty': 'Profile picture can be empty'
    })
});
exports.updateScheme = updateScheme;
//# sourceMappingURL=updateAuthInfo.js.map