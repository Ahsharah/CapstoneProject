import mongoose from "mongoose";
import { ISavedRecipe } from "../types";


// Create a new model for saved recipes with receipeId and userId
const savedRecipeSchema = new mongoose.Schema(
  {
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const SavedRecipe = mongoose.model<ISavedRecipe & mongoose.Document>(
  "SavedRecipe",
  savedRecipeSchema
);