import { Game } from '../db/models/GameModel.js';

export const getGamesService = () => Game.find();

export const getGameServiceById = gameId => Game.findById(gameId);
