"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduledTransactionScheme = exports.transactionScheme = void 0;
const joi_1 = __importDefault(require("joi"));
// const moment = require('moment-timezone');
const moment_timezone_1 = __importDefault(require("moment-timezone"));
// Define a custom validation function for checking if the date is greater than or equal to the current date in Vietnam
const isFutureDateOrTodayInVietnam = (value, helpers) => {
    const currentDateTime = (0, moment_timezone_1.default)().tz('Asia/Ho_Chi_Minh'); // Get current date and time in Vietnam timezone
    const transactionDateTime = (0, moment_timezone_1.default)(value);
    if (transactionDateTime.isSameOrAfter(currentDateTime)) {
        return value; // Date is valid
    }
    else {
        return helpers.message({
            custom: 'Transaction date must be greater than or equal to the current date in Vietnam'
        });
    }
};
const transactionScheme = joi_1.default.object({
    // userId: Joi.string().uuid().required().messages({
    //   'string.base': 'User ID must be a valid UUID',
    //   'string.required': 'User ID is required',
    //   'string.uuid': 'User ID must be a valid UUID'
    // }),
    bankAccountId: joi_1.default.string().optional().allow(null, '').messages({
        'string.base': 'User ID must be a valid UUID',
        'string.required': 'User ID is required',
        'string.uuid': 'User ID must be a valid UUID'
    }),
    // savingPlanId: Joi.string().uuid().required().messages({
    //   'string.base': 'Saving plan ID must be a valid UUID',
    //   'string.required': 'Saving plan ID is required',
    //   'string.uuid': 'Saving plan ID must be a valid UUID'
    // }),
    amount: joi_1.default.number().required().messages({
        'number.base': 'Amount must be a number',
        'number.required': 'Amount is required'
    }),
    // isSuccessful: Joi.number().integer().valid(0, 1).required().messages({
    //   'number.base': 'Is successful must be a number',
    //   'number.integer': 'Is successful must be an integer',
    //   'any.only': 'Is successful must be either 0 or 1'
    // }),
    transactionType: joi_1.default.number().valid(1, -1).required().messages({
        'number.base': 'Transaction type must be a number',
        'any.only': 'Transaction type must be either 1 or -1 (1 for purchase, -1 for withdrawal)'
    })
});
exports.transactionScheme = transactionScheme;
const scheduledTransactionScheme = joi_1.default.object({
    // userId: Joi.string().uuid().required().messages({
    //   'string.base': 'User ID must be a valid UUID',
    //   'string.required': 'User ID is required',
    //   'string.uuid': 'User ID must be a valid UUID'
    // }),
    bankAccountId: joi_1.default.string().uuid().required().messages({
        'string.base': 'User ID must be a valid UUID',
        'string.required': 'User ID is required',
        'string.uuid': 'User ID must be a valid UUID'
    }),
    // savingPlanId: Joi.string().uuid().required().messages({
    //   'string.base': 'Saving plan ID must be a valid UUID',
    //   'string.required': 'Saving plan ID is required',
    //   'string.uuid': 'Saving plan ID must be a valid UUID'
    // }),
    amount: joi_1.default.number().required().messages({
        'number.base': 'Amount must be a number',
        'number.required': 'Amount is required'
    }),
    // isSuccessful: Joi.number().integer().valid(0, 1).required().messages({
    //   'number.base': 'Is successful must be a number',
    //   'number.integer': 'Is successful must be an integer',
    //   'any.only': 'Is successful must be either 0 or 1'
    // }),
    scheduledDate: joi_1.default.date().optional().custom(isFutureDateOrTodayInVietnam).messages({
        'date.base': 'scheduledDate must be a valid date',
        'date.required': 'scheduledDate is required',
        custom: 'scheduledDate and time must be greater than or equal to the current date and time in Vietnam'
    }),
    transactionType: joi_1.default.number().valid(1, -1).required().messages({
        'number.base': 'Transaction type must be a number',
        'any.only': 'Transaction type must be either 1 or -1 (1 for purchase, -1 for withdrawal)'
    })
});
exports.scheduledTransactionScheme = scheduledTransactionScheme;
//# sourceMappingURL=transaction.scheme.js.map