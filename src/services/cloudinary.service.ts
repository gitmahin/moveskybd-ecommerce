import {v2 as cloudinary} from "cloudinary"

class CloudinaryService {
    public cloudinary = cloudinary;
    constructor() {
        this.cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: false
        })
    }

    async uploadImage(file: File) {
        // -- cloudinary upload function
    }

    
}

export const cloudinaryService = new CloudinaryService()