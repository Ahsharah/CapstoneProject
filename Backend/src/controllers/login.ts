import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Import your User model

class LoginController {
  // Update the login method
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Basic validation
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Missing email or password',
        });
        return;
      }

      // 1. Check if user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      // 2. Verify the password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      // 3. Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'defaultsecret', // Replace with a secure secret
        { expiresIn: '1h' } // Token expiration time
      );

      // 4. Send the token in the response
      res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default LoginController;
