import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getGameById, getGames } from '../controllers/gamesControllers.js';
import { idSchema } from '../validation/gamesValidation.js';

const gamesRouter = Router();

gamesRouter.get('/', getGames);

gamesRouter.get('/:gameId', celebrate(idSchema), getGameById);

export default gamesRouter;
