# Capstone Project - Recipe Generator

A full-stack application that allows users to discover, search, and save recipes. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript.

## Features

- 🔍 Search recipes by name
- 🎲 Generate random recipes
- ❤️ Save favorite recipes
- 👤 User authentication
- 📱 Responsive design

## Tech Stack

### Frontend
- React
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication

## Project Structure
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── types/
│   ├── .env
│   ├── server.ts
│   └── tsconfig.json
│
└── frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
├── .env
└── index.html
## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Recipe Routes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/search` - Search recipes by name
- `GET /api/recipes/random` - Get a random recipe
- `POST /api/recipes/save` - Save a recipe (requires auth)
- `GET /api/recipes/saved` - Get user's saved recipes (requires auth)

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository and install backend dependencies:

   ```bash
   git clone https://github.com/yourusername/random-recipe-generator.git
  
2. Install backend dependencies
cd backend
npm install

3. Install frontend dependencies
cd frontend
npm install

4. Create a .env file in the backend directory
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

5. Start the backend server
npm run dev

6. Start the frontend application
npm run dev

## Features in Development
- [ ] Save recipes functionality
  - Allow users to create a personal collection of favorite recipes
  - Add/remove recipes from saved collection
- [ ] Recipe sharing capabilities
  - Share recipes with other users
  - Share via link or within the platform
- [ ] User profile management
  - Update user information
  - View user's recipe activity
  - Manage saved recipes

Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

License -
This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments -
Thanks to all contributors who have helped with this project and my instrutors and classmates for their guidance, efforts and assistance.






