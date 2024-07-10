import connectionPool from "../configs/db.mjs";
import cloudinaryUpload from "../utils/cloudinary.uploader.mjs";

// GET
export const getUserAvatar = async (userId) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT * 
        FROM profile_pictures
        WHERE profile_id = $1;
        `,
      [userId]
    );
    return result.rows;
  } catch {
    console.error("Error fetching avatar:", error);
    throw error;
  }
};

// POST
export const uploadAvatar = async (userId, files) => {
  try {
    const fileUrls = await cloudinaryUpload(files);

    if (!Array.isArray(fileUrls) || fileUrls.length === 0) {
      throw new Error("No file URLs found from Cloudinary response");
    }

    for (let i = 0; i < fileUrls.length; i++) {
      const pictureURIs = fileUrls[i];

      const result = await connectionPool.query(
        `
        INSERT INTO profile_pictures (profile_id, cloudinary_id, url)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [userId, pictureURIs.publicId, pictureURIs.url]
      );
      if (result.rowCount === 0) {
        throw new Error(
          `Failed to update profile picture for user_id ${userId}`
        );
      }
      console.log(
        `Inserted or updated profile picture with ID ${result.rows[0].profile_id}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error updating avatar:", error);
    throw error;
  }
};
