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
    const filters: any = req.query;
    console.log("filters: ", filters);
    const cars = await CarModel.find(filters);
    res.status(200).json(cars);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all cars
export const search = async (req: Request, res: Response) => {
  try {
    // Constructing the query
    const query:any = {};
    const searchParams:any = req.query;

    // Adding model search (case-insensitive and partial match)
    if (searchParams?.model) {
      const modelRegex = new RegExp(`${searchParams.model}`, 'i');
      query.$or = [
        { model: { $regex: modelRegex } },
        { transmission: { $regex: modelRegex } },
        { description: { $regex: modelRegex } },
        { fuelType: { $regex: modelRegex } },
        { engine: { $regex: modelRegex } },
        { color: { $regex: modelRegex } },
        { features: { $regex: modelRegex } },
        { condition: { $regex: modelRegex } },
      ];
    }

    // Adding year search
    if (searchParams?.year) {
      query.year = searchParams.year;
    }

    // Adding price range search
    if (searchParams?.price) {
      query.price = {
        $gte: parseInt(searchParams.price) - 5000,
        $lte: parseInt(searchParams.price) + 10000,
      };
    }

    // Performing the search
    const cars = await CarModel.find(query);
    res.send(cars)
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
