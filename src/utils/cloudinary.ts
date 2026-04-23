import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const CLOUDINARY_FOLDER_NAME = process.env.CLOUDINARY_FOLDER_NAME
export const cloudinaryUpload = cloudinary
