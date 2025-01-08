// src/routes/index.jsx
import { Routes, Route, Navigate } from 'react-router-dom';


// Pages

import Login from '../pages/Login';
import Register from '../pages/Register';
import Recipes from '../pages/Recipes';

import SavedRecipes from '../pages/SavedRecipes';
import { useAuth } from '../context/authContext';
import Home from '../pages/Home';
import RandomRecipe from '../pages/RandomRecipe';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipes" element={<PrivateRoute><Recipes /></PrivateRoute>} />
            <Route path="/random" element={<PrivateRoute><RandomRecipe /></PrivateRoute>} />
            <Route
                path="/saved"
                element={
                    <PrivateRoute>
                        <SavedRecipes />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};