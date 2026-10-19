import { ApiError } from "../utils/ApiError.js";

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message;

  // Duplicate key (e.g. email already exists)
  if (err.code === 11000) {
    status = 409;
    message = "Already exists";
  }

  // Invalid Mongo ID
  if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID";
  }

  res.status(status).json({
    success: false,
    message: status === 500 ? "Server error" : message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};