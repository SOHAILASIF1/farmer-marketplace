import requirementModel from "../model/requirementModel.js"
import {ApiError}from "../utils/ApiError.js"
export const createRequirement=async(req,res,next)=>{
    try {
        const {title,crop,quantity,unit,maxPrice,city,description}=req.body
        if (!title||!crop||!quantity||!city) {
            throw new ApiError(400,"title , crop, quantity, and city are required")
            
            
        }
        const requirement=await requirementModel.create({
            buyer:req.user._id,
            title,
            crop,
            quantity,
            unit,
            maxPrice,
            city,
            description

        })
        res.status(200).json({success:true,requirement})
    } catch (error) {
        next(error)
        
    }
}
export const getAllRequirement=async(req,res,next)=>{
    try {
        const requirement=await requirementModel.find({status:"open"}).populate("buyer","name city").sort({createdAt:-1})
        res.status(200).json({success:true,requirement})
        
    } catch (error) {
        next(error)
        
    }
}
