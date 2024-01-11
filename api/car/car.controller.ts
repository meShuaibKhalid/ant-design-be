import { CarI } from "./car.interface";
import { Request, Response } from "express";
import CarModel from "./car.model";

// Create a new car
export const add = async (req: Request, res: Response) => {
  try {
    const newCar: CarI = req.body;
    const createdCar = await CarModel.create(newCar);
    res.status(201).json(createdCar);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all cars
export const get = async (req: Request, res: Response) => {
  try {
    const cars = await CarModel.find({});
    console.log('cars: ', cars);
    res.status(200).json(cars);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific car by ID
export const getById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const car = await CarModel.findById(carId);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a specific car by ID
export const updateById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const updatedCar: CarI = req.body;

    const existingCar = await CarModel.findById(carId);
    if (!existingCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    await CarModel.findByIdAndUpdate(carId, updatedCar);
    res.status(200).json({ message: "Car updated successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a specific car by ID
export const deleteById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const deletedCar = await CarModel.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
