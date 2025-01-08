export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface IRecipe {
  id: string;
  title: string;
  image_url: string;
  description: string;
  ingredients: string[];
  steps: string[];
  category: string;
}

export interface ISavedRecipe {
  id: string;
  recipeId: IRecipe;
  userId: IUser;
  createdAt: string;
  updatedAt: string;
}
