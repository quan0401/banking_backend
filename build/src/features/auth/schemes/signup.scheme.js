"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const signupScheme = joi_1.default.object().keys({
    username: joi_1.default.string().min(4).max(12).required().messages({
        'string.base': 'Username must be of type string',
        'string.min': 'Invalid username',
        'string.max': 'Invalid username',
        'string.empty': 'Username is a required field'
    }),
    password: joi_1.default.string().min(4).max(12).required().messages({
        'string.base': 'Password must be of type string',
        'string.min': 'Invalid password',
        'string.max': 'Invalid password',
        'string.empty': 'Password is a required field'
    }),
    cccd: joi_1.default.string().required().messages({
        'string.base': 'cccd must be of type string',
        'string.empty': 'cccd is a required field'
    }),
    homeAddress: joi_1.default.string().required().messages({
        'string.base': 'HomeAddress must be of type string',
        'string.empty': 'HomeAddress is a required field'
    }),
    email: joi_1.default.string().email().required().messages({
        'string.base': 'Email must be of type string',
        'string.email': 'Invalid email',
        'string.empty': 'Email is a required field'
    }),
    phone: joi_1.default.string().min(10).required().pattern(/^\d+$/).messages({
        'string.base': 'Email must be of type string',
        'string.email': 'Invalid email',
        'string.empty': 'Email is a required field'
    }),
    profilePicture: joi_1.default.string().required().messages({
        'string.base': 'Please add a profile picture',
        'string.email': 'Profile picture is required',
        'string.empty': 'Profile picture is required'
    })
});
exports.signupScheme = signupScheme;
//# sourceMappingURL=signup.scheme.js.map