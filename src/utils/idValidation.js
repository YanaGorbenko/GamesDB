import { isValidObjectId } from 'mongoose';

export const validateId = (id, utils) =>
  isValidObjectId(id) ? id : utils.message('Invalid id!');
