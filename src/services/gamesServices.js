import { Game } from '../db/models/GameModel.js';

export const getGamesService = async (
  page = 1,
  limit = 10,
  sortBy = 'title',
  sortOrder = 'asc',
  search,
  genres,
) => {
  const skip = (page - 1) * limit;
  const gamesQuery = Game.find();

  if (search && search.trim()) {
    gamesQuery.where({
      title: { $regex: search, $options: 'i' },
    });
  }

  if (genres && Array.isArray(genres) && genres.length > 0) {
    gamesQuery.where('genre').in(genres);
  }

  const [totalCount, games] = await Promise.all([
    gamesQuery.clone().countDocuments(),
    gamesQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { games, totalCount, totalPages };
};

export const getGameServiceById = gameId => Game.findById(gameId);
