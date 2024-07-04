"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankAccountScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const bankAccountScheme = joi_1.default.object({
    accountHolder: joi_1.default.string().required().messages({
        'string.base': 'Account holder must be a string',
        'string.required': 'Account holder is required'
    }),
    bankName: joi_1.default.string().required().messages({
        'string.base': 'Bank name must be a string',
        'string.required': 'Bank name is required'
    }),
    accountNumber: joi_1.default.string().required().messages({
        'string.base': 'Account number must be a string',
        'string.required': 'Account number is required'
    }),
    ownerAddress: joi_1.default.string().allow('').optional().messages({
        'string.base': 'Owner address must be a string',
        'string.empty': 'Owner address cannot be empty'
    }),
    ownerContact: joi_1.default.string().allow('').optional().messages({
        'string.base': 'Owner contact must be a string',
        'string.empty': 'Owner contact cannot be empty'
    }),
    accountType: joi_1.default.string().allow('').optional().messages({
        'string.base': 'Account type must be a string',
        'string.empty': 'Account type cannot be empty'
    }),
    currency: joi_1.default.string().valid('VND').optional().messages({
        'string.base': 'Currency must be a string',
        'any.only': 'Currency must be "VND"'
    }),
    branch: joi_1.default.string().allow('').optional().messages({
        'string.base': 'Branch must be a string',
        'string.empty': 'Branch cannot be empty'
    }),
    status: joi_1.default.string().allow('').optional().messages({
        'string.base': 'Status must be a string',
        'string.empty': 'Status cannot be empty'
    })
});
exports.bankAccountScheme = bankAccountScheme;
//# sourceMappingURL=bank.scheme.js.map