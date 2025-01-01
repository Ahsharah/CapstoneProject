import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/database';
//import authRoutes from './routes/authRoutes';

// Load the environment variables
dotenv.config();

// Connect to the database
connectDB();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
//app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));