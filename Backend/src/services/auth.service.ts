import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { hashPassword, comparePassword } from "../utils/password";
import { config } from "../config/config";

export class AuthService {
  static async register(username: string, email: string, password: string) {
    // check if email is already in use
    const exists = await User.findOne({ email });

    if (exists) {
      throw new Error("Email is already in use");
    }



    const hashedPassword = await hashPassword(password);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return user;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
    user.password = undefined;
    return { user, token };
  }
  // Get me
  static async getMe(userId: string) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
