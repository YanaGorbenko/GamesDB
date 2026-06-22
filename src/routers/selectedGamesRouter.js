import { Router } from 'express';
import { celebrate } from 'celebrate';
import { checkToken } from '../middlewares/checkToken.js';
import {
  getSelectedGames,
  addGameToSelected,
  removeSelectedGame,
} from '../controllers/selectedControllers.js';
import { getGamesSchema, idSchema } from '../validation/gamesValidation.js';

const selectedRouter = Router();

selectedRouter.use(checkToken);

selectedRouter.get('/', celebrate(getGamesSchema), getSelectedGames);

selectedRouter.post('/:gameId', celebrate(idSchema), addGameToSelected);

selectedRouter.delete('/:gameId', celebrate(idSchema), removeSelectedGame);

export default selectedRouter;
