import "dotenv/config"
import express from 'express'
import { connectDB } from "./config/db.js"

console.log("URI:", process.env.MONGO_URI);



const app=express()
connectDB()
const PORT=process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`port running: ${PORT}`);
    

})