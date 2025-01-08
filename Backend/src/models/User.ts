import mongoose from "mongoose";
import { IUser } from "../types";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser & mongoose.Document>(
  "User",
  userSchema
);
