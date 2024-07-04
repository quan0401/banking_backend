"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSavingPlanScheme = exports.savingPlanScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const savingPlanScheme = joi_1.default.object({
    termPeriod: joi_1.default.number().min(0).required().messages({
        'number.base': 'Term period must be a number',
        'number.positive': 'Term period must be a positive number',
        'any.required': 'Term period is a required field'
    }),
    minimumBalance: joi_1.default.number().positive().required().messages({
        'number.base': 'Minimum balance must be a number',
        'number.positive': 'Minimum balance must be a positive number',
        'any.required': 'Minimum balance is a required field'
    }),
    maximumBalance: joi_1.default.number().positive().required().messages({
        'number.base': 'Maximum balance must be a number',
        'number.positive': 'Maximum balance must be a positive number',
        'any.required': 'Maximum balance is a required field'
    }),
    minimumEachTransaction: joi_1.default.number().positive().required().messages({
        'number.base': 'Minimum each transaction must be a number',
        'number.positive': 'Minimum each transaction must be a positive number',
        'any.required': 'Minimum each transaction is a required field'
    }),
    maximumEachTransaction: joi_1.default.number().positive().optional().allow(null, '').messages({
        'number.base': 'Maximum each transaction must be a number',
        'number.positive': 'Maximum each transaction must be a positive number',
        'any.required': 'Maximum each transaction is a required field'
    }),
    interestRate: joi_1.default.number().positive().required().messages({
        'number.base': 'Interest rate must be a number',
        'number.positive': 'Interest rate must be a positive number',
        'any.required': 'Interest rate is a required field'
    }),
    interestRateBeforeDueDate: joi_1.default.number().positive().required().messages({
        'number.base': 'interestRateBeforeDueDate rate must be a number',
        'number.positive': 'interestRateBeforeDueDate rate must be a positive number',
        'any.required': 'interestRateBeforeDueDate rate is a required field'
    }),
    description: joi_1.default.string().required().messages({
        'string.base': 'Description must be a string',
        'any.required': 'Description is a required field'
    }),
    title: joi_1.default.string().required().messages({
        'string.base': 'Description must be a string',
        'any.required': 'Description is a required field'
    }),
    basicDescription: joi_1.default.string().required().messages({
        'string.base': 'basicDescription must be a string',
        'any.required': 'basicDescription is a required field'
    }),
    isActive: joi_1.default.boolean().valid(1, 0).allow(null).optional().messages({
        'boolean.base': 'isActive must be a boolean',
        'any.only': 'isActive must be either 1 or 0',
        'any.required': 'isActive is a required field'
    }),
    startDate: joi_1.default.date().required().messages({
        'date.base': 'Start date must be a valid date',
        'any.required': 'Start date is a required field'
    }),
    endDate: joi_1.default.date().allow(null).optional().messages({
        'date.base': 'End date must be a valid date or null'
    }),
    currency: joi_1.default.string().required().messages({
        'string.base': 'Currency must be a string',
        'any.required': 'Currency is a required field'
    }),
    image: joi_1.default.string().required().messages({
        'string.base': 'Currency must be a string',
        'any.required': 'Currency is a required field'
    })
});
exports.savingPlanScheme = savingPlanScheme;
const updateSavingPlanScheme = joi_1.default.object({
    termPeriod: joi_1.default.number().positive().required().messages({
        'number.base': 'Term period must be a number',
        'number.positive': 'Term period must be a positive number',
        'any.required': 'Term period is a required field'
    }),
    minimumBalance: joi_1.default.number().positive().required().messages({
        'number.base': 'Minimum balance must be a number',
        'number.positive': 'Minimum balance must be a positive number',
        'any.required': 'Minimum balance is a required field'
    }),
    maximumBalance: joi_1.default.number().positive().required().messages({
        'number.base': 'Maximum balance must be a number',
        'number.positive': 'Maximum balance must be a positive number',
        'any.required': 'Maximum balance is a required field'
    }),
    minimumEachTransaction: joi_1.default.number().positive().required().messages({
        'number.base': 'Minimum each transaction must be a number',
        'number.positive': 'Minimum each transaction must be a positive number',
        'any.required': 'Minimum each transaction is a required field'
    }),
    maximumEachTransaction: joi_1.default.number().positive().optional().allow(null, '').messages({
        'number.base': 'Maximum each transaction must be a number',
        'number.positive': 'Maximum each transaction must be a positive number',
        'any.required': 'Maximum each transaction is a required field'
    }),
    interestRate: joi_1.default.number().positive().required().messages({
        'number.base': 'Interest rate must be a number',
        'number.positive': 'Interest rate must be a positive number',
        'any.required': 'Interest rate is a required field'
    }),
    interestRateBeforeDueDate: joi_1.default.number().positive().required().messages({
        'number.base': 'interestRateBeforeDueDate rate must be a number',
        'number.positive': 'interestRateBeforeDueDate rate must be a positive number',
        'any.required': 'interestRateBeforeDueDate rate is a required field'
    }),
    description: joi_1.default.string().required().messages({
        'string.base': 'Description must be a string',
        'any.required': 'Description is a required field'
    }),
    title: joi_1.default.string().required().messages({
        'string.base': 'Description must be a string',
        'any.required': 'Description is a required field'
    }),
    basicDescription: joi_1.default.string().required().messages({
        'string.base': 'basicDescription must be a string',
        'any.required': 'basicDescription is a required field'
    }),
    isActive: joi_1.default.boolean().valid(1, 0).allow(null).optional().messages({
        'boolean.base': 'isActive must be a boolean',
        'any.only': 'isActive must be either 1 or 0',
        'any.required': 'isActive is a required field'
    }),
    startDate: joi_1.default.date().required().messages({
        'date.base': 'Start date must be a valid date',
        'any.required': 'Start date is a required field'
    }),
    endDate: joi_1.default.date().allow(null).optional().messages({
        'date.base': 'End date must be a valid date or null'
    }),
    currency: joi_1.default.string().required().messages({
        'string.base': 'Currency must be a string',
        'any.required': 'Currency is a required field'
    }),
    image: joi_1.default.string().required().messages({
        'string.base': 'Currency must be a string',
        'any.required': 'Currency is a required field'
    })
});
exports.updateSavingPlanScheme = updateSavingPlanScheme;
//# sourceMappingURL=savingPlan.cheme.js.map