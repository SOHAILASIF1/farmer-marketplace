import { Router } from "express";
import { register } from "../controllers/userController.js";
import { registerLimiter } from "../middlewares/rateLimit.js";

const router = Router();

router.post("/register", registerLimiter, register);

export default router;