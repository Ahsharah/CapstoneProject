import mongoose from "mongoose";
import { IRecipe } from "../types";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image_url: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model<IRecipe & mongoose.Document>(
  "Recipe",
  recipeSchema
);
