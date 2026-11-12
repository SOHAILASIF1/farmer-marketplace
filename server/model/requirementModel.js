import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    crop: { type: String, enum: ["red-chilli", "cotton", "maize"], required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, enum: ["maund", "kg", "ton"], default: "maund" },
    maxPrice: { type: Number, min: 0 },
    city: { type: String, required: true, trim: true },
    description: { type: String, trim: true, maxlength: 500 },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model("Requirement", requirementSchema);