// src/controllers/favoritesControllers.js
import createHttpError from 'http-errors';
import {
  addGameToSelectedService,
  removeGameFromSelectedService,
  getSelectedGamesService,
} from '../services/usersServices.js';
import { getGameServiceById } from '../services/gamesServices.js';
import { findUserById } from '../services/authServices.js';

export const getSelectedGames = async (req, res) => {
  const userId = req.user._id;
  const { page, limit, sortBy, sortOrder, search, genres } = req.query;
  if (genres && typeof genres === 'string') {
    genres = genres.split(',').map(g => g.trim());
  }
  const selected = await getSelectedGamesService(
    userId,
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    genres,
  );

  res.json({
    selected,
    total: selected.length,
  });
};

export const addGameToSelected = async (req, res) => {
  const userId = req.user._id;
  const { gameId } = req.params;

  const game = await getGameServiceById(gameId);
  if (!game) {
    throw createHttpError(404, 'Game not found');
  }
  const updatedUser = await addGameToSelectedService(userId, gameId);

  res.status(200).json({
    message: 'Game added to selected successfully',
    selected: updatedUser.selectedGames,
  });
};

export const removeSelectedGame = async (req, res) => {
  const userId = req.user._id;
  const { gameId } = req.params;

  const game = await getGameServiceById(gameId);
  if (!game) {
    throw createHttpError(404, 'Game not found');
  }
  const updatedUser = await removeGameFromSelectedService(userId, gameId);

  res.status(200).json({
    message: 'Game removed from selected successfully',
    selected: updatedUser.selectedGames,
  });
};
