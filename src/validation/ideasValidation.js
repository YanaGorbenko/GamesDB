import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { GENRES } from '../constants/index.js';

const validateId = (id, utils) =>
  isValidObjectId(id) ? id : utils.message('Invalid id!');

export const getIdeasSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(10).default(10),
  }),
};

export const createIdeaSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Field title is required',
    }),
    description: Joi.string().min(2).max(350).required(),
    genre: Joi.string().valid(...GENRES),
  }),
};

export const updateIdeaSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(50),
    description: Joi.string().min(2).max(350),
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
