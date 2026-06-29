import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getGameById, getGames } from '../controllers/gamesControllers.js';
import { getGamesSchema, idSchema } from '../validation/gamesValidation.js';

const gamesRouter = Router();

gamesRouter.get('/', celebrate(getGamesSchema), getGames);

gamesRouter.get('/:gameId', celebrate(idSchema), getGameById);

export default gamesRouter;
