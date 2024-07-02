import * as dotenv from "dotenv";

dotenv.config();
import { v2 as cloudinary } from "cloudinary";
const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_KEY_SECRET } =
  process.env;
const cloudinaryConfig = {
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_KEY_SECRET,
  secure: true,
};

cloudinary.config(cloudinaryConfig);

export default cloudinary;
