import { updateUserAvatarService } from '../services/usersServices.js';

export const updateAvatar = async (req, res, next) => {
  const { avatarUrl } = req.body;
  const userId = req.user._id;

  const result = await updateUserAvatarService(userId, avatarUrl);

  res.status(200).json({
    success: true,
    message: 'Avatar updated successfully',
    data: result,
  });
};
