import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBookmark, FiRefreshCw } from 'react-icons/fi';
import { useRecipes } from '../context/RecipeContext';

import { useEffect, useState } from 'react';
import { RecipeCard } from '../components/RecipeCard';

export default function Home() {
  const navigate = useNavigate();
  const { getRandomRecipe } = useRecipes();
  const [featuredRecipe, setFeaturedRecipe] = useState(null);

  useEffect(() => {
    const loadFeaturedRecipe = async () => {
      const recipe = await getRandomRecipe();
      setFeaturedRecipe(recipe);
    };
    loadFeaturedRecipe();
  }, []);

  const features = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "Discover Recipes",
      description: "Search through our collection of delicious recipes"
    },
    {
      icon: <FiBookmark className="w-8 h-8" />,
      title: "Save Favorites",
      description: "Keep track of recipes you love for quick access"
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "Random Recipe",
      description: "Find inspiration with a random recipe suggestion"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Your Perfect Recipe Awaits
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover, save, and cook amazing recipes from around the world
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => navigate('/recipes')}
            className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Browse Recipes
          </button>
          <button 
            onClick={() => navigate('/random')}
            className="px-8 py-3 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
          >
            Random Recipe
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 py-12">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4 text-blue-500">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Featured Recipe */}
      {featuredRecipe && (
        <div className="py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Recipe of the Day</h2>
          <div className="max-w-md mx-auto">
            <RecipeCard recipe={featuredRecipe} />
          </div>
        </div>
      )}
    </div>
  );
}