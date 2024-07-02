import mongoose from "mongoose";
import { MONGO_URI } from "./config"; // Import the URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
