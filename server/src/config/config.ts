import * as dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = process.env.MONGODB_URL;

if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI environment variable!");
}
