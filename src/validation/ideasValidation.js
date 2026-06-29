import { Joi, Segments } from 'celebrate';
import { GENRES } from '../constants/index.js';
import { validateId } from '../utils/idValidation.js';

export const getIdeasSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(5).default(5),
  }),
};

export const createIdeaSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Field title is required',
    }),
    description: Joi.string().min(2).max(1000).required(),
    genre: Joi.string().valid(...GENRES),
  }),
};

export const updateIdeaSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(50),
    description: Joi.string().min(2).max(1000),
    genre: Joi.string().valid(...GENRES),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    ideaId: Joi.string().custom(validateId).required(),
  }),
};

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    ideaId: Joi.string().custom(validateId).required(),
  }),
};
