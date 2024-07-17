import "dotenv/config";
import cloudinary from "../configs/cloudinary.config.mjs";
import fs from "fs/promises";
import { Console } from "console";

export const cloudinaryUpload = async (files) => {
  try {
    const fileUrls = [];
    for (let file of files.avatar) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `${process.env.CLOUDINARY_UPLOAD_FOLDER}`,
        type: "private",
      });
      fileUrls.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
      await fs.unlink(file.path);
    }
    return fileUrls;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export const cloudinaryDestroy = async (publicIds) => {
  try {
    for (let publicId of publicIds) {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log(result);
    }
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};
