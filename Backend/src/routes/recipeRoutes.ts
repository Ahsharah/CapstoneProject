import { Router } from "express";
import { RecipeController } from "../controllers/recipeController";
import { auth } from "../middlewares/auth";

const router = Router();

// Public routes
router.get("/", RecipeController.getRecipes);
router.get("/search", RecipeController.search);
router.get("/random", RecipeController.getRandom);

// Protected routes
router.use(auth);
router.post("/save", RecipeController.saveRecipe);
router.get("/user/:id/saved-recipes", RecipeController.getSavedRecipes);

export default router;
