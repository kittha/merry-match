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

export const createUser = async (data) => {
  const { username, email, role } = data;
  const currentDateTime = new Date();
  try {
    const result = await connectionPool.query(
      `INSERT INTO users (username, email, created_at, updated_at)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id`,
      [username, email, currentDateTime, currentDateTime]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in user model", error.message);
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

export const updateUser = async (userId, reqBody, avatarUri) => {
  try {
    const {
      user_id,
      username,
      email,
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
      role,
    } = reqBody;

    const currentDateTime = new Date();
    // update data in users table
    const userResult = await connectionPool.query(
      `UPDATE users SET username = $2, updated_at = $3 
      WHERE user_id = $1`,
      [userId, username, currentDateTime]
    );
    // console.log(userId);

    // update data in user_profiles table
    const profileResult = await connectionPool.query(
      `UPDATE user_profiles SET 
        name = $2, 
        date_of_birth = $3, 
        location = $4, 
        city = $5, 
        sexual_identities = $6, 
        sexual_preferences = $7, 
        racial_preferences = $8, 
        meeting_interests = $9,
        bio = $10, 
        updated_at = $11
      WHERE user_id = $1
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
        bio,
        currentDateTime,
      ]
    );

    const profileId = profileResult.rows[0].profile_id;

    // update data in hobbies table
    const hobbiesResult = await connectionPool.query(
      `SELECT * FROM hobbies WHERE profile_id = $1`,
      [profileId]
    );
    const existsHobbies = hobbiesResult.rows;
    if (hobbies.length) {
      let round = Math.max(hobbies.length, existsHobbies.length);
      for (let i = 0; i < round; i++) {
        // no user's hobby in this sequence in database
        if (!existsHobbies[i]) {
          await connectionPool.query(
            `INSERT INTO hobbies (profile_id, content, created_at, updated_at)
            VALUES ($1, $2, $3, $4)`,
            [profileId, hobbies[i], currentDateTime, currentDateTime]
          );
        } else {
          // compare if exists hobby not equal to added hobby then UPDATE
          if (hobbies[i] !== existsHobbies[i]) {
            await connectionPool.query(
              `UPDATE hobbies SET content = $2, updated_at = $3
              WHERE profile_id = $1`,
              [profileId, hobbies[i], currentDateTime]
            );
          }
        }
      }
      // empty hobbies from client
    } else {
      await connectionPool.query(`DELETE FROM hobbies WHERE profile_id = $1`, [
        profileId,
      ]);
    }
    hobbies;

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

    return { message: "Update Success" };
  } catch (error) {
    console.error("user.model error", error);
  }
};
