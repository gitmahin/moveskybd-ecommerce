import { handleApiRequest } from "@/lib";
import { CLOUDINARY_FOLDER_NAME, cloudinaryUpload } from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.formData()
    const caption = body.get("caption")
    const alt = body.get("alt")
    const file = body.get("file") as File;


    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // -- Convert file to buffer for streaming
    const fileBuffer = await file.arrayBuffer()

    // -- Return error if file type is not an image
    if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const uploadResult = await new Promise((resolve, reject) => {
        cloudinaryUpload.uploader.upload_stream(
            {
                resource_type: "image", folder: CLOUDINARY_FOLDER_NAME, unique_filename: true, context: {
                    caption, // its a title according to cloudinary
                    alt // its a description according to cloudinary
                },
                

            },
            
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ).end(Buffer.from(fileBuffer))
    });

    return NextResponse.json({ message: "OK", result: uploadResult }, { status: 200 })
}


