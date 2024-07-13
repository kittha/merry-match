import connectionPool from "../configs/db.mjs";
import cloudinaryUpload from "../utils/cloudinary.uploader.mjs";

/**
 *
 * @param {number} userId
 * @param {object} files - The Object which contain key:value pair. Key is avatar. Value is Array of Objects. Each Object contain key:value pair of fieldname, originalname, encoding, mimetype, destination, filename, path, size.
 * @returns {boolean}
 */
//ยังใช้อยู่มั้ย??
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
    hobbies,
    bio,
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
    console.error("Error in profile model", error);
    throw error;
  }
};

export const getProfile = async (userId) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM profiles WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in profile model", error);
    throw error;
  }
};

export const updateProfile = async (userId, data) => {
  const {
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
  } = data;
  const currentDateTime = new Date();
  try {
    await connectionPool.query(
      `UPDATE profiles SET 
          name = $2, 
          date_of_birth = $3, 
          location = $4, 
          city = $5, 
          sexual_identities = $6, 
          sexual_preferences = $7, 
          racial_preferences = $8, 
          meeting_interests = $9,
          hobbies = $10
          bio = $11, 
          updated_at = $12
        WHERE user_id = $1
        RETURNING *`,
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
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in profile model", error);
    throw error;
  }
};
