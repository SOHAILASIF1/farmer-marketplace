import {ApiError}from "../utils/ApiError.js"
export const createRequirement=async(req,res,next)=>{
    try {
        const {title,crop,quantity,unit,maxPrice,city,description}=req.body
        if (!title||!crop||!quantity||!city) {
            throw new ApiError(400,"title , crop, quantity, and city are required")
            
            
        }
    } catch (error) {
        
    }
}