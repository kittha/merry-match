import connectionPool from "../configs/db.mjs";

export const createAvatars = async (userId, avatarUri) => {
  const currentDateTime = new Date();
  if (avatarUri) {
    for (let i = 0; i < avatarUri.length; i++) {
      try {
        await connectionPool.query(
          `INSERT INTO profile_pictures (
            user_id,
            sequence, 
            cloudinary_id, 
            url, 
            created_at, 
            updated_at)
          VALUES ($1, $2, $3, $4, $5, $5)`,
          [
            userId,
            i + 1,
            avatarUri[i].publicId,
            avatarUri[i].url,
            currentDateTime,
          ]
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

/**avatarUri structure
  avatarUri = [{
    url: result.secure_url,
    publicId: result.public_id,
  }, ...]
  **/
// TODO: check path if exists --> don't upload to cloudinary!!!
export const upsertAvatars = async (userId, avatarUri) => {
  const currentDateTime = new Date();
  for (let i = 0; i < avatarUri.length; i++) {
    try {
      await connectionPool.query(
        `INSERT INTO profile_pictures (
          user_id,
          sequence, 
          cloudinary_id, 
          url, 
          created_at, 
          updated_at)
        VALUES ($1, $2, $3, $4, $5, $5)
        ON CONFLICT (url) DO UPDATE 
        SET sequence = EXCLUDED.sequence, updated_at = $5`,
        [
          userId,
          i + 1,
          avatarUri[i].publicId,
          avatarUri[i].url,
          currentDateTime,
        ]
      );
      await connectionPool.query(
        `DELETE FROM profile_pictures 
        WHERE user_id = $1 AND updated_at != $2`,
        [userId, currentDateTime]
      );
    } catch (error) {
      console.error("Error in profile picture model: ", error);
      throw error;
    }
  }
};
