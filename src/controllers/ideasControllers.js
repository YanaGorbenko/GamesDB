import { Idea } from '../db/models/IdeaModel.js';
import createHttpError from 'http-errors';
import {
  addIdeaService,
  deletedIdeaService,
  getAllIdeasService,
  getUserIdeasService,
  unvoteIdeaService,
  updateIdeaService,
  voteIdeaService,
} from '../services/ideasService.js';

export const getAllIdeas = async (req, res) => {
  const { page, limit } = req.query;
  const ideas = await getAllIdeasService(page, limit);
  res.json(ideas);
};

export const getUserIdeas = async (req, res) => {
  const { page, limit } = req.query;
  const authorId = req.user._id;
  const ideas = await getUserIdeasService(authorId, page, limit);
  res.json(ideas);
};

export const addIdea = async (req, res) => {
  const body = req.body;
  const authorId = req.user._id;
  const newIdea = await addIdeaService({ authorId, ...body });
  res.status(201).json(newIdea);
};

export const deleteIdea = async (req, res) => {
  const { ideaId } = req.params;
  const authorId = req.user._id;
  const deletedIdea = await deletedIdeaService(ideaId, authorId);
  if (!deletedIdea) {
    throw createHttpError(404, 'Idea not found!');
  }
  res.status(201).json(deletedIdea);
};

export const updateIdea = async (req, res) => {
  const { ideaId } = req.params;
  const body = req.body;
  const authorId = req.user._id;
  const result = await updateIdeaService(ideaId, authorId, body);
  if (!result) {
    throw createHttpError(404, 'Idea not found!');
  }
  res.json(result.data);
};

export const voteIdea = async (req, res, next) => {
  const { ideaId } = req.params;
  const userId = req.user._id;

  const updatedIdea = await voteIdeaService(ideaId, userId);

  res.status(200).json({
    success: true,
    message: 'Vote added successfully',
    data: updatedIdea,
  });
};

export const unvoteIdea = async (req, res, next) => {
  const { ideaId } = req.params;
  const userId = req.user._id;

  const updatedIdea = await unvoteIdeaService(ideaId, userId);

  res.status(200).json({
    success: true,
    message: 'Vote removed successfully',
    data: updatedIdea,
  });
};
