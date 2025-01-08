import mongoose from 'mongoose';
import { Recipe } from '../models/Receipe';
import { SavedRecipe } from '../models/SavedRecipe';

interface RecipeQueryParams {
  title?: string;
  category?: string;
  ingredient?: string;
}

export class RecipeService {
  // Get all recipes with optional filtering
  static async getRecipes(params: RecipeQueryParams) {
    try {
      const { title, category, ingredient } = params;
      const query: any = {};

      if (title) {
        query.title = { $regex: title, $options: 'i' };
      }
      if (category) {
        query.category = category;
      }
      if (ingredient) {
        query.ingredients = { $regex: ingredient, $options: 'i' };
      }

      const recipes = await Recipe.find(query).lean().exec();
      return recipes;

    } catch (error) {
      throw new Error('Error fetching recipes');
    }
  }

  // Search recipes by keyword
  static async searchRecipes(keyword: string) {
    try {
      const recipes = await Recipe.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { category: { $regex: keyword, $options: 'i' } }
        ]
      });
      return recipes;
    } catch (error) {
      throw new Error('Error searching recipes');
    }
  }

  // Get a random recipe
  static async getRandomRecipe() {
    try {
      const count = await Recipe.countDocuments();
      const random = Math.floor(Math.random() * count);
      const recipe = await Recipe.findOne().skip(random);
      return recipe;
    } catch (error) {
      throw new Error('Error fetching random recipe');
    }
  }

  // Toggle recipe save status
  static async toggleSavedRecipe(userId: string, recipeId: string) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      // Check if recipe exists
      const recipe = await Recipe.findById(recipeId).session(session);
      if (!recipe) {
        throw new Error('Recipe not found');
      }

      // Check if recipe is already saved
      const existingSave = await SavedRecipe.findOne({
        userId: userId,
        recipeId: recipeId
      }).session(session);

      if (existingSave) {
        // If saved, remove it
        await SavedRecipe.findByIdAndDelete(existingSave._id).session(session);
        await session.commitTransaction();
        return { message: 'Recipe removed from saved recipes', saved: false };
      } else {
        // If not saved, save it
        await SavedRecipe.create([{
          userId: userId,
          recipeId: recipeId
        }], { session });
        await session.commitTransaction();
        return { message: 'Recipe saved successfully', saved: true };
      }
    } catch (error) {
      await session.abortTransaction();
      throw new Error('Error toggling recipe save status');
    } finally {
      session.endSession();
    }
  }

  // Get user's saved recipes
  static async getSavedRecipes(userId: string) {
    try {
      const savedRecipes = await SavedRecipe
        .find({ userId: userId })
        .populate('recipeId')
        .sort({ createdAt: -1 });
      return savedRecipes;
    } catch (error) {
      throw new Error('Error fetching saved recipes');
    }
  }

  // Check if a recipe is saved by user
  static async isRecipeSaved(userId: string, recipeId: string) {
    try {
      const savedRecipe = await SavedRecipe.findOne({
        userId: userId,
        recipeId: recipeId
      });
      return !!savedRecipe;
    } catch (error) {
      throw new Error('Error checking recipe save status');
    }
  }
}