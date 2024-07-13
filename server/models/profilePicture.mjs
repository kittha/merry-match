import connectionPool from "../configs/db.mjs";

export const createAvatars = async (userId, avatarUri) => {
  const currentDateTime = new Date();
  if (avatarUri) {
    for (let file of avatarUri) {
      try {
        await connectionPool.query(
          `INSERT INTO profile_pictures (
            user_id, 
            cloudinary_id, 
            url, 
            created_at, 
            updated_at)
        VALUES ($1, $2, $3, $4, $5)`,
          [userId, file.publicId, file.url, currentDateTime, currentDateTime]
        );
      } catch (error) {
        console.error("Error in profile picture model: ", error);
        throw error;
      }
    }
  }
};

export const getAvatars = async (userId) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM profile_pictures 
      WHERE user_id = $1`,
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.error("Error in profile picture model: ", error);
    throw error;
  }
};

export const updateAvatars = async (userId, avatarUri) => {
  /**avatarUri structure
    avatarUri = {
      url: result.secure_url,
      publicId: result.public_id,
    }
    **/
  // TODO: check path if exists not startwith("http") something --> don't upload to cloudinary!!!
  // get data from profile_pictures table
  // const avatarsResult = await connectionPool.query(
  //   `SELECT * FROM profile_pictures WHERE profile_id = $1`,
  //   [profileId]
  // );
  // const avatars = avatarsResult.rows;
};
