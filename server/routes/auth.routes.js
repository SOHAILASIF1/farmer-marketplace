import { Router } from "express";
import { login, profile, register } from "../controllers/userController.js";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimit.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("/register", registerLimiter, register);
router.post("/login",loginLimiter,login)
router.get("/me",protect,profile)

export default router;