import { Schema, model } from 'mongoose';
import { GENRES } from '../../constants/index.js';

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageURL: {
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
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false },
);

export const Game = model('Game', gameSchema);
