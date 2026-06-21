import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/4837/4837857.png',
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.index({ email: 1 });

export const User = model('User', userSchema);
