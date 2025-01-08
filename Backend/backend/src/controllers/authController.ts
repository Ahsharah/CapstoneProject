import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthRequest } from "../middlewares/auth";

interface ServiceError extends Error {
  statusCode?: number;
  code?: string;
}
export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await AuthService.register(username, email, password);
      res.status(201).json(user);
    } catch (error) {
      const serviceError = error as ServiceError;
      res.status(400).json({ error: serviceError.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      delete user.password;
      res.json({ user, token });
    } catch (error) {
      const serviceError = error as ServiceError;
      res.status(401).json({ error: serviceError.message });
    }
  }
  // Get Me
  static async getMe(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.userId;
      const user = await AuthService.getMe(userId);
      user.password = undefined;
      res.json(user);
    } catch (error) {
      const serviceError = error as ServiceError;
      res.status(401).json({ error: serviceError.message });
    }
  }
}
