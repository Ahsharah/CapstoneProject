import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
   
    if (!token) {

      throw new Error("No authentication token provided");
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};
