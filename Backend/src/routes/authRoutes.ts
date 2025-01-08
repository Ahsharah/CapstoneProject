import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", auth, AuthController.getMe);
export default router;
