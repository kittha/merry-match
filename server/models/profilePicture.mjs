import connectionPool from "../configs/db.mjs";

export const getAvatars = async (userId) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM roles WHERE role_id = $1`,
      [roleId]
    );

    if (result.rows.length === 0) {
      return { message: `user role not found` };
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error occurred while fetching user:", error);
    throw error;
  }
};

export const createProfilePicture = async (profileId, avatarUri) => {
  const currentDateTime = new Date();
  if (avatarUri) {
    for (let file of avatarUri) {
      try {
        await connectionPool.query(
          `INSERT INTO profile_pictures (
            profile_id, 
            cloudinary_id, 
            url, 
            created_at, 
            updated_at)
        VALUES ($1, $2, $3, $4, $5)`,
          [profileId, file.publicId, file.url, currentDateTime, currentDateTime]
        );
      } catch (error) {
        console.error("Error in profile picture: ", error.message);
        throw error;
      }
    }
  }
};
