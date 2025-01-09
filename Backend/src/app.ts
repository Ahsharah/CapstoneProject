import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { config } from "./config/config";
import { auth } from "./middlewares/auth";
import authRoutes from "./routes/authRoutes";
import recipeRoutes from "./routes/recipeRoutes";
const app = express();
import { Request, Response } from "express";
// Middleware
app.use(express.json());
app.use(morgan("dev"));

// setup cors
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000',
    'https://capstone-project-frontend-eight.vercel.app',
     'https://capstoneproject-b0mm.onrender.com',
 config.origin!],
   
   
    // credentials: true,
  })
);

app.get("/health",(_:Request,res:Response)=>{
  res.json({
    working:true
  })
})

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", auth,recipeRoutes);
// app.use("/api/saved", auth, savedRecipeRoutes);

// Protected Routes

// Database connection
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))
 

export default app;
