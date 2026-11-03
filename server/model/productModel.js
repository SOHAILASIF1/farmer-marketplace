import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    crop: { type: String, enum: ["red-chilli", "cotton","maize"], required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, enum: ["maund", "kg", "ton"], default: "maund" },
    price: { type: Number, required: true, min: 0 },   // per unit
    city: { type: String, required: true, trim: true },
    quality: { type: String, enum: ["A", "B", "C"] },
    description: { type: String, trim: true, maxlength: 500 },
    status: { type: String, enum: ["active", "sold"], default: "active" },

},{timestamps:true})
export default mongoose.model("Product",productSchema)