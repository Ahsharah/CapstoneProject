// SavedRecipes.js
import { useEffect, useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from '../components/RecipeCard';
import { Loader } from '../components/Loader';

export default function SavedRecipes() {
    const { savedRecipes, fetchSavedRecipes, getSavedCount } = useRecipes();
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchSavedRecipes();
                const savedCount = await getSavedCount();
                setCount(savedCount);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Your Recipe Collection</h2>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                    {count} Saved Recipes
                </span>
            </div>

            {savedRecipes.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No saved recipes yet. Start exploring and save your favorites!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {savedRecipes.map((savedRecipe,i) => (
                        <RecipeCard
                            key={savedRecipe._id+i}
                            recipe={savedRecipe.recipeId}
                            isSaved={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}