import mongoose, { Document, Schema } from "mongoose";
import { CarI } from "./car.interface";

const carSchema = new Schema<CarI>(
  {
    model: { type: String, required: false },
    images: [{ type: String, required: false }],
    description: { type: String, required: false },
    year: { type: Number, required: false },
    mileage: { type: Number, required: false },
    price: { type: Number, required: false },
    transmission: { type: String, required: false }, // dropdown
    doors: { type: Number, required: false },
    fuelType: { type: String, required: false }, // dropdown
    seats: { type: Number, required: false },
    engine: { type: String, required: false },
    color: { type: String, required: false },
    condition: { type: String, required: false }, // dropdown
    sale: { type: Boolean, required: false },
    features: { type: String, required: false },
    safetyFeatures: { type: String, required: false },
    exteriorFeatures: { type: String, required: false },
    interiorFeatures: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const CarModel = mongoose.model<CarI>("Car", carSchema);

export default CarModel;
