import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import { globalLimiter } from "./middlewares/rateLimit.js";
import { notFound, errorHandler } from "./middlewares/error.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js"

console.log("URI:", process.env.MONGODB_URI);



const app=express()
connectDB()
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", globalLimiter);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`port running: ${PORT}`);
    

})