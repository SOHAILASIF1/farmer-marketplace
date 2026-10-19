import rateLimit from "express-rate-limit";

const make = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: { success: false, message },
  });

// Poori API
export const globalLimiter = make(15 * 60 * 1000, 1000, "Too many requests");

// Register
export const registerLimiter = make(15 * 60 * 1000, 5, "Too many accounts created");

// Login (baad mein use hoga)
export const loginLimiter = make(15 * 60 * 1000, 50, "Too many login attempts");