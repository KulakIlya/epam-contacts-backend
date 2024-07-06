import Joi from 'joi';
import { emailRegex } from '../constants.js';

export const registration = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

export const login = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
});
