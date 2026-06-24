import { Joi, Segments } from 'celebrate';

export const updateAvatarSchema = {
  [Segments.BODY]: Joi.object({
    avatarUrl: Joi.string().uri().required(),
  }),
};
