import createHttpError from 'http-errors';
import {
  createSession,
  createUser,
  findUserByEmail,
  deleteSessionByUserId,
  deleteSessionById,
  findSessionById,
  findUserById,
} from '../services/authServices.js';
import bcrypt from 'bcrypt';
import { clearCookies, setCookies } from '../utils/index.js';

export const signUp = async (req, res) => {
  const { name, email, password, photo } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw createHttpError(409, 'User with such email already exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
    photo,
  });

  const session = await createSession(newUser._id);

  setCookies(session, res);

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    photo: newUser.photo,
  });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const arePasswordsEqual = await bcrypt.compare(password, user.password);

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await deleteSessionByUserId(user._id);

  const session = await createSession(user._id);

  setCookies(session, res);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    photo: user.photo,
  });
};

export const logout = async (req, res) => {
  const { sessionId } = req.cookies;

  await deleteSessionById(sessionId);

  clearCookies(res);

  res.sendStatus(204);
};

export const refreshSession = async (req, res) => {
  const { sessionId } = req.cookies;

  const session = await findSessionById(sessionId);

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isRefreshTokenValid = session.refreshTokenExpiresAt > new Date();

  if (!isRefreshTokenValid) {
    await deleteSessionById(session._id);
    clearCookies(res);
    throw createHttpError(401, 'Refresh token not valid');
  }

  await deleteSessionById(session._id);

  const newSession = await createSession(session.userId);

  setCookies(newSession, res);

  res.sendStatus(204);
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      throw createHttpError(401, 'No session');
    }

    const session = await findSessionById(sessionId);

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    const userId = session.userId;

    const user = await findUserById(userId);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    });
  } catch (error) {
    next(error);
  }
};
