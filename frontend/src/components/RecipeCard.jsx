import { useState } from 'react';
import { useAuth } from "../context/authContext";
import { FiHeart, FiClock } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useRecipes } from '../context/RecipeContext';
import { RecipeModal } from './RecipeModal';

export const RecipeCard = ({ recipe, isSaved = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const { saveRecipe, removeSavedRecipe } = useRecipes();
  const [isHovered, setIsHovered] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveToggle = async () => {
    if (!user) return;
    setSaving(true);
    try {
      if (isSaved) {
        await removeSavedRecipe(recipe._id);
      } else {
        await saveRecipe(recipe._id);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>

      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-56 object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          {user && (
            <button
              onClick={handleSaveToggle}
              disabled={saving}
              className={`absolute top-4 right-4 p-2 rounded-full 
                        ${isSaved ? 'bg-red-500' : 'bg-white'} 
                        ${saving ? 'opacity-50' : 'hover:scale-110'} 
                        transform transition-all duration-300 shadow-md`}
            >
              {isSaved ? (
                <FaHeart className="w-6 h-6 text-white" />
              ) : (
                <FiHeart className="w-6 h-6 text-red-500" />
              )}
            </button>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <span className="text-white text-sm font-medium px-3 py-1 rounded-full bg-blue-500 inline-flex items-center">
              <FiClock className="w-4 h-4 mr-1" />
              {recipe.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {recipe.ingredients.length} ingredients
            </span>
            <button
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={() => setIsModalOpen(true)}
            >
              View Recipe →
            </button>
          </div>
        </div>
      </div>
      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={recipe}
      />
    </>
  );
};