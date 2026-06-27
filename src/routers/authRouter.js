import { Router } from 'express';
import {
  getCurrentUser,
  logout,
  refreshSession,
  signIn,
  signUp,
} from '../controllers/authControllers.js';
import { celebrate } from 'celebrate';
import { signInSchema, signUpSchema } from '../validation/authValidation.js';

const router = Router();

router.post('/sign-up', celebrate(signUpSchema), signUp);
router.post('/sign-in', celebrate(signInSchema), signIn);
router.post('/logout', logout);
router.post('/refresh', refreshSession);
router.get('/current', getCurrentUser);

export default router;
