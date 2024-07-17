import Joi from 'joi';

export const addAuthor = Joi.object({
  name: Joi.string().required(),
});

export const addManyAuthors = Joi.object({
  names: Joi.array().items(Joi.string()).required(),
});

export const updateAuthor = Joi.object({
  name: Joi.string().required(),
});
