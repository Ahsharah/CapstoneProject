import { createContext, useContext, useState } from 'react';
import { api } from '../lib/axios';
import { useAuth } from './authContext';

const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user } = useAuth();
    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/recipes');
            setRecipes(data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch recipes');
        } finally {
            setLoading(false);
        }
    };

    const fetchSavedRecipes = async () => {
        try {
            setLoading(true);
            // Using the user's ID from auth context or local storage
            const { data } = await api.get(`/recipes/user/${user._id}/saved-recipes`);
            setSavedRecipes(data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch saved recipes');
        } finally {
            setLoading(false);
        }
    };

    const saveRecipe = async (recipeId) => {
        try {
            setLoading(true);
            await api.post('/recipes/save', { recipeId });
            await fetchSavedRecipes(); // Refresh saved recipes list
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save recipe');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeSavedRecipe = async (recipeId) => {
        try {
            setLoading(true);
            await saveRecipe(recipeId); // Using the same endpoint as it toggles the save state
            await fetchSavedRecipes(); // Refresh saved recipes list
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to remove saved recipe');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getRandomRecipe = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/recipes/random');
            setError(null);
            return data;
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to get random recipe');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const searchRecipes = async (query) => {
        try {
            setLoading(true);
            const { data } = await api.get('/recipes/search', {
                params: { keyword: query }
            });
            setRecipes(data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to search recipes');
        } finally {
            setLoading(false);
        }
    };

    const isSaved = (recipeId) => {
        return savedRecipes.some(recipe => recipe.recipeId === recipeId);
    };

    const getSavedCount = () => {
        return savedRecipes.length;
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                savedRecipes,
                loading,
                error,
                fetchRecipes,
                fetchSavedRecipes,
                saveRecipe,
                removeSavedRecipe,
                getRandomRecipe,
                searchRecipes,
                isSaved,
                getSavedCount,
                clearError
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error('useRecipes must be used within a RecipeProvider');
    }
    return context;
};