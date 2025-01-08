import { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from '../components/RecipeCard';

export default function RandomRecipe() {
  const { getRandomRecipe } = useRecipes();
  const [recipe, setRecipe] = useState(null);

  const handleGenerateRandom = async () => {
    const randomRecipe = await getRandomRecipe();
    setRecipe(randomRecipe);
  };

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={handleGenerateRandom}
        className="w-full bg-blue-500 text-white p-3 rounded mb-6"
      >
        Generate Random Recipe
      </button>
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  );
}