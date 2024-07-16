import "dotenv/config";
import cloudinary from "../configs/cloudinary.config.mjs";
import fs from "fs/promises";

/**
 * Cloudinary Picture Upload Utility
 *
 * @param {object} files - The files object after parsed with multer.
 * @returns
 */
const cloudinaryUpload = async (files) => {
  try {
    const fileUris = [];

    for (let file of files.avatar) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `${process.env.CLOUDINARY_UPLOAD_FOLDER}`,
        type: "private",
      });
      fileUris.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
      await fs.unlink(file.path);
    }
    return fileUris;
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
