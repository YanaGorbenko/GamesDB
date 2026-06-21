import { Game } from '../db/models/GameModel.js';
import createHttpError from 'http-errors';
import {
  getGameServiceById,
  getGamesService,
} from '../services/gamesServices.js';

export const getGames = async (req, res) => {
  const { page, limit, sortBy, sortOrder, search, genres } = req.query;
  const games = await getGamesService(
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    genres,
  );
  res.json(games);
};

export const getGameById = async (req, res) => {
  const { gameId } = req.params;
  const game = await getGameServiceById(gameId);
  if (!game) {
    throw createHttpError(404, 'Task not found!');
  }
  res.json(game);
};
