import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const validateId = (id, utils) =>
  isValidObjectId(id) ? id : utils.message('Invalid id!');

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    gameId: Joi.string().custom(validateId).required(),
  }),
};
