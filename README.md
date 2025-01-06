# Random Recipe Generator

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

1. Clone the repository
```bash
git clone https://github.com/yourusername/random-recipe-generator.git
