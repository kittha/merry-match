import connectionPool from "../configs/db.mjs";
import cloudinaryUpload from "../utils/cloudinary.uploader.mjs";

/**
 *
 * @param {number} userId
 * @returns {array} - The Array of Objects, In the Object it contains many key:value pairs of picture_id, profile_id, cloudinary_id, url, created_at, updated_at.
 */
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

/**
 *
 * @param {number} userId
 * @param {object} files - The Object which contain key:value pair. Key is avatar. Value is Array of Objects. Each Object contain key:value pair of fieldname, originalname, encoding, mimetype, destination, filename, path, size.
 * @returns {boolean}
 */
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

export const createProfile = async (userId, data) => {
  const {
    name,
    date_of_birth,
    location,
    city,
    sexual_identities,
    sexual_preferences,
    racial_preferences,
    meeting_interests,
    bio,
    hobbies,
  } = data;
  const currentDateTime = new Date();

  try {
    const result = await connectionPool.query(
      `INSERT INTO profiles (
        user_id, 
        name, 
        date_of_birth, 
        location, 
        city, 
        sexual_identities, 
        sexual_preferences, 
        racial_preferences, 
        meeting_interests,
        hobbies, 
        bio, 
        created_at, 
        updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING profile_id`,
      [
        userId,
        name,
        date_of_birth,
        location,
        city,
        sexual_identities,
        sexual_preferences,
        racial_preferences,
        meeting_interests,
        hobbies,
        bio,
        currentDateTime,
        currentDateTime,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in profile model", error.message);
    throw error;
  }
};
