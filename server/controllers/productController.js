import { trusted } from "mongoose";
import productModel from "../model/productModel.js";
import { ApiError } from "../utils/ApiError.js";
export const createProductSeller = async (req, res, next) => {
    try {

        const { title, crop, quantity, unit, price, city, quality, description } = req.body
        if (!title || !crop || !quantity || !price || !city) {
            throw new ApiError(400, "Title,crop,quantity,price and city are required")

        }
        const product = await productModel.create({
            seller: req.user._id,
            title,
            crop,
            quantity,
            unit,
            price,
            city,
            quality,
            description
        })
        res.status(201).json({ success: true, product })
    } catch (error) {
        next(error)

    }

}
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({ status: "active" }).populate("seller", "name city").sort({ createdAt: -1 })


        res.status(200).json({ success: true, products })

    } catch (error) {
        next(error)


    }
}
export const getProductById = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id).populate("seller", "name city")
        if (!product) {
            throw new ApiError(404, "Products not found")

        }

        res.status(200).json({ success: true, product })

    } catch (error) {
        next(error)

    }
}

export const getMyProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({
            seller: req.user._id
        }).sort({ createdAt: -1 })
        res.status(200).json({ success: true, products })

    } catch (error) {
        next(error)

    }

}


export const updateProduct = async (req, res, next) => {
    try {
        const { title, crop, quantity, unit, price, city, quality, description } = req.body;
        const product = await productModel.findByIdAndUpdate({
            _id: req.params.id, seller: req.user._id
        }, { title, crop, quantity, price, city, quality, description }, { new: true, runValidators: trusted })
        if (!product) {
            throw new ApiError(404,"product not found or may be not yours")
        }
        res.status(200).json({
            success:true,
            product
        })

    } catch (error) {
        next(error)

    }
}