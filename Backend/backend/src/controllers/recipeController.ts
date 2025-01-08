import { Request, Response } from "express";
import { RecipeService } from "../services/recipe.service";
import { AuthRequest } from "../middlewares/auth";

// Custom error type
interface ServiceError extends Error {
  statusCode?: number;
  code?: string;
}

export class RecipeController {
  // Get all recipes with optional filtering
  static async getRecipes(
    req: Request,
    res: Response
  ): Promise<Response | any> {
    try {
      const recipes = await RecipeService.getRecipes(req.query);
      return res.json(recipes);
    } catch (error) {
      const serviceError = error as ServiceError;
      return res.status(serviceError.statusCode || 500).json({
        error: serviceError.message || "Internal server error",
      });
    }
  }

  // Search recipes by keyword
  static async search(req: Request, res: Response): Promise<Response | any> {
    try {
      const { keyword } = req.query;

      const recipes = await RecipeService.searchRecipes(String(keyword || ""));
      return res.json(recipes);
    } catch (error) {
      const serviceError = error as ServiceError;
      return res.status(serviceError.statusCode || 500).json({
        error: serviceError.message || "Internal server error",
      });
    }
  }

  // Get random recipe
  static async getRandom(req: Request, res: Response): Promise<Response | any> {
    try {
      const recipe = await RecipeService.getRandomRecipe();
      if (!recipe) {
        return res.status(404).json({ error: "No recipes found" });
      }
      return res.json(recipe);
    } catch (error) {
      const serviceError = error as ServiceError;
      return res.status(serviceError.statusCode || 500).json({
        error: serviceError.message || "Internal server error",
      });
    }
  }

  // Save recipe to user's list
  static async saveRecipe(
    req: AuthRequest,
    res: Response
  ): Promise<Response | any> {
    try {
      const { recipeId } = req.body;
      const userId = req.user?.userId;

      if (!recipeId) {
        return res.status(400).json({ error: "Recipe ID is required" });
      }

      const result = await RecipeService.toggleSavedRecipe(userId, recipeId);
      return res.json(result);
    } catch (error) {
      const serviceError = error as ServiceError;
      return res.status(serviceError.statusCode || 500).json({
        error: serviceError.message || "Internal server error",
      });
    }
  }

  // Get user's saved recipes
  static async getSavedRecipes(
    req: AuthRequest,
    res: Response
  ): Promise<Response | any> {
    try {
      // /users/:id/saved-recipes
      const userId = req.params.id;
      const savedRecipes = await RecipeService.getSavedRecipes(userId);
      return res.json(savedRecipes);
    } catch (error) {
      const serviceError = error as ServiceError;
      return res.status(serviceError.statusCode || 500).json({
        error: serviceError.message || "Internal server error",
      });
    }
  }
}
