import connectionPool from "../configs/db.mjs";

/**
 * Check if user exist in the registry of Merry Match application.
 *
 * @param {string} email
 * @returns
 */
export const doesUserExist = async (email) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT *
        FROM auth.users
        WHERE email = $1
        `,
      [email]
    );

    return result;
  } catch (error) {
    console.error("Error occurred during signUp:", error);
    throw error;
  }
};

/**
 * Get user data (from table: users, user_profiles, hobbies, profile_picture) from email from the Merry Match application.
 *
 * @param {string} email
 * @returns {object} - The data object, containing the user, profile, hobbies, avatar key:value pairs.
 */
export const getUser = async (email) => {
  try {
    // get data from users table
    const userResult = await connectionPool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const userId = userResult.rows[0].user_id;
    // console.log(userId);

    // get data from user_profiles table
    const profileResult = await connectionPool.query(
      `SELECT * FROM user_profiles WHERE user_id = $1`,
      [userId]
    );

    const profileId = profileResult.rows[0].profile_id;

    // get data from hobbies table
    const hobbiesResult = await connectionPool.query(
      `SELECT * FROM hobbies WHERE profile_id = $1`,
      [profileId]
    );

    // get data from profile_pictures table
    const avatarsResult = await connectionPool.query(
      `SELECT * FROM profile_pictures WHERE profile_id = $1`,
      [profileId]
    );

    const data = {
      user: userResult.rows[0],
      profile: profileResult.rows[0],
      hobbies: hobbiesResult.rows,
      avatars: avatarsResult.rows,
    };

    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error occurred during signIn:", error);
  }
};
