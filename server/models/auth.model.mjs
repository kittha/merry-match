// this is a place to create our own auth model
// if you want to register user, get user information
// please go to ./server/models/user.model.mjs
import connectionPool from "../configs/db.mjs";
import { supabase } from "../utils/supabaseClient.mjs";

export const createUser = async (reqBody, avatarUri) => {
  try {
    await connectionPool.query("BEGIN");

    const {
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

    const created_at = new Date();
    const updated_at = new Date();

    // const result = await connectionPool.query(
    //   `SELECT role_id FROM roles WHERE name = $1`,
    //   [role]
    // );

    // Add user data to users table
    const resultFromUsers = await connectionPool.query(
      `INSERT INTO users (username, email, created_at, updated_at)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id`,
      [username, email, created_at, updated_at]
    );
    //user.id

    const { user_id } = resultFromUsers.rows[0];
    // Add user data to user_profiles table
    const resultFromProfiles = await connectionPool.query(
      `INSERT INTO user_profiles (user_id, name, date_of_birth, location, city, sexual_identities, sexual_preferences, racial_preferences, meeting_interests, bio, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING profile_id`,
      [
        user_id,
        name,
        date_of_birth,
        location,
        city,
        sexual_identities,
        sexual_preferences,
        racial_preferences,
        meeting_interests,
        bio,
        created_at,
        updated_at,
      ]
    );

    const { profile_id } = resultFromProfiles.rows[0];
    // Add hobbies/interests data to hobbies table
    // hobbies = ['tag1', 'tag2', ...]
    for (let tag of hobbies) {
      try {
        await connectionPool.query(
          `INSERT INTO hobbies (profile_id, content, created_at, updated_at)
          VALUES ($1, $2, $3, $4)`,
          [profile_id, tag, created_at, updated_at]
        );
      } catch (error) {
        console.error("Error occurred while inserting hobbies:", error);
        throw error;
      }
    }

    // Add profile pictures to profile_pictures table
    // fileUrls = [{
    //   url: result.secure_url,
    //   publicId: result.public_id,
    // }, ...];
    if (avatarUri) {
      for (let file of avatarUri) {
        try {
          await connectionPool.query(
            `INSERT INTO profile_pictures (profile_id, cloudinary_id, url, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5)`,
            [profile_id, file.publicId, file.url, created_at, updated_at]
          );
        } catch (error) {
          console.error(
            "Error occurred while inserting profile pictures:",
            error
          );
          throw error;
        }
      }
    }

    await connectionPool.query("COMMIT");
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during signUp:", error);
    throw error;
  }
};

export const getUserRole = async (authId) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT users.user_id, users.auth_id, roles.role_id, roles.name
        FROM users JOIN roles 
        ON users.role_id = roles.role_id 
        AND users.auth_id = $1
        `,
      [authId]
    );

    if (result.rows.length === 0) {
      return { message: `user role not found` };
    }

    const userRole = result.rows[0];
    return userRole;
  } catch (error) {
    console.error("Error occurred while fetching user:", error);
    throw error;
  }
};

export const getPackageByParams = async (req) => {
  try {
    const packageName = req.params.packageName;
    const result = await connectionPool.query(
      `
          SELECT *
          FROM packages
          WHERE name = $1
          `,
      [packageName]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  } finally {
    connectionPool.release();
  }
};
