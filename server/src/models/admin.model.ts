// adminModel.ts
import mongoose, { Schema, Document } from "mongoose";

// Define an interface representing the document structure
interface IUser extends Document {
  username: string;
  password: string;
}

// Define the schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Define and export the model with collection name "admin"
const Admin = mongoose.model<IUser>("admin", userSchema);
export default Admin;
