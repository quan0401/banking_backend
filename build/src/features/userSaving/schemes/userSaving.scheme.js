"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSavingScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const userSavingScheme = joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty'
    }),
    savingPlanId: joi_1.default.string().required().messages({
        'string.base': 'Saving plan ID must be a string',
        'string.empty': 'Saving plan ID cannot be empty'
    })
});
exports.userSavingScheme = userSavingScheme;
//# sourceMappingURL=userSaving.scheme.js.map