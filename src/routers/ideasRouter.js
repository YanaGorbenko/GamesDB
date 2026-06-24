import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  addIdea,
  deleteIdea,
  getAllIdeas,
  getUserIdeas,
  unvoteIdea,
  updateIdea,
  voteIdea,
} from '../controllers/ideasControllers.js';
import {
  createIdeaSchema,
  getIdeasSchema,
  idSchema,
  updateIdeaSchema,
} from '../validation/ideasValidation.js';
import { checkToken } from '../middlewares/checkToken.js';

const ideasRouter = Router();

ideasRouter.get('/', checkToken, getUserIdeas);

ideasRouter.get('/all', celebrate(getIdeasSchema), getAllIdeas);

ideasRouter.post('/', checkToken, celebrate(createIdeaSchema), addIdea);

ideasRouter.delete('/:ideaId', checkToken, celebrate(idSchema), deleteIdea);

ideasRouter.patch(
  '/:ideaId',
  checkToken,
  celebrate(updateIdeaSchema),
  updateIdea,
);

ideasRouter.post('/:ideaId/vote', checkToken, celebrate(idSchema), voteIdea);
ideasRouter.delete(
  '/:ideaId/vote',
  checkToken,
  celebrate(idSchema),
  unvoteIdea,
);

export default ideasRouter;
