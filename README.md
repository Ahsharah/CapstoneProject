# Recipe Finder App

The **Recipe Finder App** is a full-stack web application designed to help users discover, save, and manage their favorite recipes effortlessly. This project integrates an intuitive React frontend with a robust Node.js backend and MongoDB database, providing a seamless and engaging user experience.

---

## Features

- **User Authentication**:
  - Secure login and signup functionality.
  - Token-based authentication using middleware.

- **Recipe Search**:
  - Search for recipes by keyword or ingredients.
  - Fetch recipe data dynamically from the backend.

- **Save Recipes**:
  - Logged-in users can save their favorite recipes for easy access.

- **Random Recipe Generator**:
  - Discover new recipes with a single click.

- **Responsive Design**:
  - Tailored to look great on any device using Tailwind CSS.

---

## Tech Stack

- **Frontend**:
  - React
  - React Router
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express.js
  - TypeScript

- **Database**:
  - MongoDB with Mongoose

- **Other Tools**:
  - Axios
  - Vite (Frontend Development Server)
  - ESLint and Prettier (Code Quality)

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v16+)
- npm (v7+)
- MongoDB (Local or Atlas)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ahsharah/capstoneproject


2. Navigate to the backend directory:
cd capstoneproject/backend


3. Install dependencies 
npm install

4. Create a .env file with the following:
MONGO_URI=your-mongodb-uri
PORT=5000
JWT_SECRET=your-secret-key

5. Start the backend server:
npm start

  ## Frontend Setup

1. Navigate to the frontend directory:
cd ../frontend

2. Install dependencies:
npm install

3. Create a .env file with the following:
VITE_BACKEND_URL=http://localhost:5000

4. Start the frontend development server:
npm run dev

Open the app in your browser at http://localhost:5173.

## API Documentation

Base URL: http://localhost:5000
Authentication Routes

POST /api/auth/signup: Create a new user.
POST /api/auth/login: Login and receive a token.
Recipe Routes

GET /api/recipes: Fetch all recipes.
GET /api/recipes/random: Get a random recipe.
POST /api/recipes/save: Save a recipe (requires authentication).
GET /api/recipes/user/:id/saved-recipes: Get all saved recipes for a user.

## Future Enhancements

**Add recipe filters (e.g., vegetarian, gluten-free).
**Improve performance for large datasets with pagination.
**Fully migrate to TypeScript and resolve errors.
**Enhance the UI with animations and additional interactivity.

## Contributors

Alexandria Walker - Ahsharah

## License

This project is licensed under the MIT License. See the LICENSE file for details.


**Thank you to my instructors, coherts and tutors for their guidance, patience and faith in the production of this Capstone Project.


