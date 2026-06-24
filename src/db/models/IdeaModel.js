import { Schema, model } from 'mongoose';
import { GENRES } from '../../constants/index.js';

const ideaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: GENRES,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      min: 0,
      default: 0,
    },
    voters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { versionKey: false },
);

export const Idea = model('Idea', ideaSchema);
