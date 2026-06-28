import { User } from '../db/models/UserModel.js';
import { Game } from '../db/models/GameModel.js';

export const getSelectedGamesService = async (
  userId,
  page = 1,
  limit = 10,
  sortBy = 'title',
  sortOrder = 'asc',
  search,
  genres,
) => {
  const skip = (page - 1) * limit;

  const user = await User.findById(userId);

  if (!user || !user.selectedGames || user.selectedGames.length === 0) {
    return { games: [], totalCount: 0, totalPages: 0 };
  }

  const selectedGameIds = user.selectedGames;

  const gamesQuery = Game.find({
    _id: { $in: selectedGameIds },
  });

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
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { games, totalCount, totalPages };
};

export const addGameToSelectedService = async (userId, gameId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $addToSet: { selectedGames: gameId } },
    { new: true },
  ).populate('selectedGames');
};

export const removeGameFromSelectedService = async (userId, gameId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { selectedGames: gameId } },
    { new: true },
  ).populate('selectedGames');
};

export const updateUserAvatarService = async (userId, avatarUrl) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { photo: avatarUrl },
    {
      new: true,
      select: 'name email photo',
    },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return {
    _id: user._id,
    photo: user.photo,
    name: user.name,
    email: user.email,
  };
};
