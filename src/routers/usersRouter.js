import { Router } from 'express';
import { celebrate } from 'celebrate';
import { checkToken } from '../middlewares/checkToken.js';
import { updateAvatar } from '../controllers/usersController.js';
import { updateAvatarSchema } from '../validation/usersValidation.js';

const userRouter = Router();

userRouter.put(
  '/avatar',
  checkToken,
  celebrate(updateAvatarSchema),
  updateAvatar,
);

export default userRouter;
