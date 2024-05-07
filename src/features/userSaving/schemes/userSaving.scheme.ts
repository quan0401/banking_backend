import Joi, { ObjectSchema } from 'joi';

const userSavingScheme: ObjectSchema = Joi.object({
  // userId: Joi.string().uuid().required().messages({
  //   'string.base': 'User ID must be a valid UUID',
  //   'string.required': 'User ID is required',
  //   'string.uuid': 'User ID must be a valid UUID'
  // }),
  // savingPlanId: Joi.string().uuid().required().messages({
  //   'string.base': 'Saving plan ID must be a valid UUID',
  //   'string.required': 'Saving plan ID is required',
  //   'string.uuid': 'Saving plan ID must be a valid UUID'
  // }),
  // totalAmount: Joi.number().min(0).required().messages({
  //   'number.base': 'Total amount must be a number',
  //   'number.min': 'Total amount must be greater than or equal to 0',
  //   'any.required': 'Total amount is required'
  // }),
  // lastUpdated: Joi.date().required().messages({
  //   'date.base': 'Last updated must be a valid date',
  //   'any.required': 'Last updated is required'
  // }),
  currency: Joi.string().required().messages({
    'string.base': 'Currency must be a string',
    'string.empty': 'Currency cannot be empty'
  }),
  targetAmount: Joi.number().allow(null).optional().messages({
    'number.base': 'Target amount must be a number',
    'number.null': 'Target amount must be null or a number'
  })
});

export { userSavingScheme };
