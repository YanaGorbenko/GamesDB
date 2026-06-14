import { Game } from '../db/models/GameModel.js';
import createHttpError from 'http-errors';
import {
  getGameServiceById,
  getGamesService,
} from '../services/gamesServices.js';

export const getGames = async (req, res) => {
  const games = await getGamesService();
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
