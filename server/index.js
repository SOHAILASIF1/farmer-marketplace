import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { globalLimiter } from "./middlewares/rateLimit.js";
import { notFound, errorHandler } from "./middlewares/error.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js"
import productRoutes from "./routes/productRoutes.js";

console.log("URI:", process.env.MONGODB_URI);



const app=express()
connectDB()
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));

app.use("/api", globalLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);


app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`port running: ${PORT}`);
    

})