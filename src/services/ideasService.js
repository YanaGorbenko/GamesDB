import { Idea } from '../db/models/IdeaModel.js';
import createHttpError from 'http-errors';

export const getAllIdeasService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const ideasQuery = Idea.find().populate('authorId', 'name email photo');

  const [totalCount, ideas] = await Promise.all([
    ideasQuery.clone().countDocuments(),
    ideasQuery.skip(skip).limit(limit).sort({ votes: 'asc' }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { ideas, totalCount, totalPages };
};

export const getUserIdeasService = async (authorId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const ideasQuery = Idea.find({ authorId }).populate('authorId', 'email');

  const [totalCount, ideas] = await Promise.all([
    ideasQuery.clone().countDocuments(),
    ideasQuery.skip(skip).limit(limit).lean(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { ideas, totalCount, totalPages };
};

export const addIdeaService = ideaData => Idea.create(ideaData);
export const deletedIdeaService = (id, authorId) =>
  Idea.findOneAndDelete({ authorId, _id: id });

export const updateIdeaService = async (id, authorId, ideaData) => {
  const result = await Idea.findOneAndUpdate({ authorId, _id: id }, ideaData, {
    returnDocument: 'after',
    includeResultMetadata: true,
  });

  if (!result.value) {
    return null;
  }

  return {
    data: result.value,
    isUpdated: result.lastErrorObject.updatedExisting,
  };
};

export const voteIdeaService = async (ideaId, userId) => {
  const idea = await Idea.findById(ideaId);

  if (!idea) {
    throw createHttpError(404, 'Idea not found');
  }

  if (idea.authorId.toString() === userId.toString()) {
    throw createHttpError(403, 'You cannot vote for your own idea');
  }

  if (idea.voters.includes(userId)) {
    throw createHttpError(409, 'You have already voted for this idea');
  }

  const updatedIdea = await Idea.findByIdAndUpdate(
    ideaId,
    {
      $push: { voters: userId },
      $inc: { votes: 1 },
    },
    { new: true },
  ).populate('authorId', 'email');

  return {
    ideaId: updatedIdea._id,
    totalVotes: updatedIdea.votes,
    userVoted: true,
  };
};

export const unvoteIdeaService = async (ideaId, userId) => {
  const idea = await Idea.findById(ideaId);

  if (!idea) {
    throw createHttpError(404, 'Idea not found');
  }

  if (!idea.voters.includes(userId)) {
    throw createHttpError(404, 'You have not voted for this idea');
  }

  const updatedIdea = await Idea.findByIdAndUpdate(
    ideaId,
    {
      $pull: { voters: userId },
      $inc: { votes: -1 },
    },
    { new: true },
  ).populate('authorId', 'email');

  return {
    ideaId: updatedIdea._id,
    totalVotes: updatedIdea.votes,
    userVoted: false,
  };
};
