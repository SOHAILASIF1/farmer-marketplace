import { json } from "express"
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
export const getMyRequirement=async(req,res,next)=>{
    try {
        const requirement=await requirementModel.find({buyer:req.user._id}).sort({createdAt:-1})
        res.status(200).json({success:true,requirement})
        
    } catch (error) {
        next(error)
        
    }
}
export const closeRequirement=async(req,res,next)=>{
    try {
        const requirement=await requirementModel.findByIdAndUpdate({_id:req.params.id,buyer:req.user._id},{status:"closed"},{new:true})
        if (!requirement) {
            throw new ApiError(404,"Requirement Not Found")

            
        }
        res.status(200).json({success:true,requirement})

        
    } catch (error) {
        next(error)
    }
}
export const deletRequirement=async(req,res,next)=>{
    try {
        const requirement=await requirementModel.findByIdAndDelete({
            _id:req.params.id,
            buyer:req.user._id
        })
        if (!requirement) {
            throw new ApiError(404,"Requirement not Found")
            
        }
        res.status(200),json({success:true,message:"Requiremrnt Deleted"})
        
    } catch (error) {
        next(error)
        
    }
}
