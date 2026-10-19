import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'

const ALLOWED_ROLES = ["farmer", "buyer", "dealer"];

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, city } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "Name, email and password are required");
    }
    if (password.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters");
    }

    const userRole = ALLOWED_ROLES.includes(role) ? role : "buyer";

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) throw new ApiError(409, "Email already registered");

    // Hash password here
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      phone,
      city,
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};



export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    // password field select:false hai, isliye +password
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) throw new ApiError(401, "Invalid email or password");

    // Compare in controller
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ApiError(401, "Invalid email or password");

    if (user.isBlocked) throw new ApiError(403, "Account blocked");

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    // Save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production mein true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};