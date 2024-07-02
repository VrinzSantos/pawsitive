import { Request, Response } from "express";
import Admin from "../models/admin.model";

export const AdminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find an admin with the provided username and password
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      // If an admin is found, respond with a success message
      res.status(200).json({ message: "Login successful", data: admin });
    } else {
      // If no admin is found, respond with an error message
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    // If an error occurs, respond with an internal server error message
    console.error("Error validating credentials:", error);
    res.status(500).json({ error: "Internal error" });
  }
};

export const createAdminUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await Admin.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user document
    const newUser = new Admin({
      username,
      password: password,
    });

    // Save the new user document to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAdminData = async (req: Request, res: Response) => {
  try {
    const adminData = await Admin.findOne();
    console.log("🚀 ~ getAdminData ~ adminData:", adminData);
    if (!adminData) {
      // If no admin data is found, respond with an error message
      return res.status(404).json({ error: "Admin data not found" });
    }
    // If admin data is found, respond with the data
    res.status(200).json(adminData);
  } catch (error) {
    // If an error occurs, respond with an internal server error message
    console.error("Error retrieving admin data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAdminProfile = async (req: Request, res: Response) => {
  try {
    const { username, password, _id } = req.body;

    // Fetch the admin profile by ID
    const adminProfile = await Admin.findById(_id);

    // Check if admin profile exists
    if (!adminProfile) {
      return res.status(404).json({
        success: false,
        message: "Admin profile not found",
      });
    }

    // Check if username is provided and already exists
    if (username) {
      const existingUser = await Admin.findOne({ username });
      if (existingUser && existingUser._id.toString() !== _id) {
        return res.status(400).json({ error: "Username already exists" });
      }
      adminProfile.username = username;
    }

    // Update password if provided
    if (password) {
      adminProfile.password = password;
    }

    // Save the updated admin profile
    await adminProfile.save();

    res.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      data: adminProfile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error in updating admin profile",
      error: error.message,
    });
  }
};
