import Joi from 'joi';

export const addCourse = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().required(),
  authors: Joi.array().items(Joi.string()),
});

export const updateCourse = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  duration: Joi.number(),
  authors: Joi.array().items(Joi.string()),
});
