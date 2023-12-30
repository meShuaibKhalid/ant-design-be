import { Request, Response } from "express";
import UserModel from "./user.model";
const bcryptjs = require("bcryptjs");

// Create a new user
export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const userExists = await UserModel.findOne({ email: body.email });
    if (userExists) {
      res.status(403).json({ message: "User already exists" });
    }
    const user = new UserModel(body);
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all users
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists in database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isMatch = await bcryptjs.compare(password, user?.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.send({
      role: user?.role,
      email: user?.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all users
export const get = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find({
      is_active: true,
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a user by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    const user = await UserModel.find({
      _id: userId,
      is_active: true,
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a user by ID
export const updateById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a user by ID
export const deleteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;
  try {
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { is_active: false },
      { new: true }
    );
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
