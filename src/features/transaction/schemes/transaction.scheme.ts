import Joi from 'joi';

const transactionScheme = Joi.object({
  userId: Joi.string().uuid().required().messages({
    'string.base': 'User ID must be a valid UUID',
    'string.required': 'User ID is required',
    'string.uuid': 'User ID must be a valid UUID'
  }),
  transactorName: Joi.string().required().messages({
    'string.base': 'Transactor name must be a string',
    'string.required': 'Transactor name is required'
  }),
  savingPlanId: Joi.string().uuid().required().messages({
    'string.base': 'Saving plan ID must be a valid UUID',
    'string.required': 'Saving plan ID is required',
    'string.uuid': 'Saving plan ID must be a valid UUID'
  }),
  amount: Joi.number().required().messages({
    'number.base': 'Amount must be a number',
    'number.required': 'Amount is required'
  }),
  isSuccessful: Joi.number().integer().valid(0, 1).required().messages({
    'number.base': 'Is successful must be a number',
    'number.integer': 'Is successful must be an integer',
    'any.only': 'Is successful must be either 0 or 1'
  }),
  transactionDate: Joi.date().required().messages({
    'date.base': 'Transaction date must be a valid date',
    'date.required': 'Transaction date is required'
  }),
  transactionType: Joi.number().valid(1, -1).required().messages({
    'number.base': 'Transaction type must be a number',
    'any.only': 'Transaction type must be either 1 or -1 (1 for purchase, -1 for withdrawal)'
  })
});

export { transactionScheme };
