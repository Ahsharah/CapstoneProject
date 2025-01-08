import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Recipe } from "../models/Receipe";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Appetizer",
];

const predefinedRecipes = [
  {
    title: "Classic Pancakes",
    image_url: "https://example.com/images/classic-pancakes.jpg",
    description: "Fluffy and golden pancakes perfect for breakfast.",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tablespoons sugar",
      "1 tablespoon baking powder",
      "1/2 teaspoon salt",
      "1 1/2 cups milk",
      "2 eggs",
      "1/4 cup melted butter",
    ],
    steps: [
      "In a bowl, mix the dry ingredients together.",
      "In another bowl, whisk the milk, eggs, and melted butter.",
      "Combine the wet and dry ingredients until smooth.",
      "Heat a non-stick pan and pour 1/4 cup of batter for each pancake.",
      "Cook until bubbles form, flip, and cook until golden brown.",
    ],
    category: "Breakfast",
  },
  {
    title: "Spaghetti Carbonara",
    image_url: "https://example.com/images/spaghetti-carbonara.jpg",
    description: "A classic Italian pasta dish with creamy sauce.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g grated Parmesan",
      "Salt and pepper",
      "2 cloves garlic",
    ],
    steps: [
      "Cook the spaghetti in salted boiling water until al dente.",
      "Fry the pancetta with garlic until crispy.",
      "Whisk eggs and Parmesan in a bowl.",
      "Drain pasta and quickly mix with pancetta and egg mixture.",
      "Serve with extra Parmesan and black pepper.",
    ],
    category: "Dinner",
  },
  {
    title: "Chocolate Chip Cookies",
    image_url: "https://example.com/images/chocolate-chip-cookies.jpg",
    description: "Crispy on the edges and gooey in the center cookies.",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1/2 teaspoon salt",
      "1 cup butter",
      "3/4 cup sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "1 teaspoon vanilla extract",
      "2 cups chocolate chips",
    ],
    steps: [
      "Preheat oven to 375°F (190°C).",
      "Mix dry ingredients in a bowl.",
      "Cream butter, sugars, and vanilla in another bowl.",
      "Add eggs one at a time, then mix in dry ingredients.",
      "Stir in chocolate chips and drop by spoonfuls onto a baking sheet.",
      "Bake for 8-10 minutes until golden brown.",
    ],
    category: "Dessert",
  },
  {
    title: "Caesar Salad",
    image_url: "https://example.com/images/caesar-salad.jpg",
    description: "A fresh and crispy Caesar salad.",
    ingredients: [
      "1 head Romaine lettuce",
      "1/2 cup croutons",
      "1/4 cup grated Parmesan",
      "Caesar dressing",
    ],
    steps: [
      "Wash and chop the Romaine lettuce.",
      "Toss lettuce with croutons and Parmesan.",
      "Drizzle with Caesar dressing and serve immediately.",
    ],
    category: "Lunch",
  },
  {
    title: "Tomato Soup",
    image_url: "https://example.com/images/tomato-soup.jpg",
    description: "A comforting bowl of creamy tomato soup.",
    ingredients: [
      "2 cups canned tomatoes",
      "1 cup chicken or vegetable broth",
      "1/2 cup heavy cream",
      "1 small onion, diced",
      "2 cloves garlic, minced",
      "1 tablespoon olive oil",
      "Salt and pepper",
    ],
    steps: [
      "Heat olive oil in a pot and sauté onions and garlic.",
      "Add tomatoes and broth, then simmer for 20 minutes.",
      "Blend until smooth and stir in cream.",
      "Season with salt and pepper, then serve hot.",
    ],
    category: "Appetizer",
  },
  // Add 5 more recipes if needed...
];

const generateRecipe = () => ({
  title: faker.commerce.productName(),
  image_url: faker.image.url(),
  description: faker.lorem.paragraph(),
  ingredients: Array.from(
    { length: faker.number.int({ min: 3, max: 10 }) },
    () => faker.commerce.productName()
  ),
  steps: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () =>
    faker.lorem.sentence()
  ),
  category: faker.helpers.arrayElement(categories),
});

async function seedDB() {
  try {
    await Recipe.deleteMany({});

    const recipes = [
      ...predefinedRecipes,
      ...Array.from({ length: 10 }, generateRecipe), // Additional faker recipes
    ];

    await Recipe.insertMany(recipes);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

export { seedDB };

// seedDB();
