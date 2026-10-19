import { Router } from "express";
import { login, register } from "../controllers/userController.js";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimit.js";

const router = Router();

router.post("/register", registerLimiter, register);
router.post("/login",loginLimiter,login)

export default router;