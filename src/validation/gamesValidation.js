import { Joi, Segments } from 'celebrate';
import { GENRES } from '../constants/index.js';
import { validateId } from '../utils/idValidation.js';

export const getGamesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(10).default(10),
    sortBy: Joi.string().valid('title', 'rating').default('title'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
    genres: Joi.string()
      .custom((value, helpers) => {
        const genresArray = value.split(',').map(g => g.trim());

        for (const genre of genresArray) {
          if (!GENRES.includes(genre)) {
            return helpers.error('any.invalid', {
              message: `"${genre}" is not a valid genre. Allowed: ${GENRES.join(', ')}`,
            });
          }
        }

        return genresArray;
      })
      .messages({
        'any.invalid': 'Invalid genre: {#label}',
      }),
    search: Joi.string(),
  }),
};

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    gameId: Joi.string().custom(validateId).required(),
  }),
};
