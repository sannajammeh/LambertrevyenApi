'use strict';
import Joi from '@hapi/joi';
import { VALIDATION_ERROR } from '../error.types';

const validateOptions = {
  abortEarly: false,
};

const validate = schema => (req, res, next) => {
  const { error } = schema.validate(req.body, validateOptions);

  if (error) {
    const { details } = error;
    const fields = [];

    details.forEach(({ context, message }) => {
      fields.push({ name: context.key, message });
    });
    error.fields = fields;
    error.message = VALIDATION_ERROR;

    return next(error);
  }
  return next();
};

export const createTicketSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string()
    .min(8)
    .max(8),
  playId: Joi.string().required(),
  date: Joi.string().required(),
  seats: Joi.object().required(),
});

export default validate;
