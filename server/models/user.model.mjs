import connectionPool from "../configs/db.mjs";
import { supabase } from "../utils/supabaseClient.mjs";

export const createUser = async (reqBody, avatarUri) => {
  try {
    await connectionPool.query("BEGIN");

    const {
      data: { user },
    } = await supabase.auth.getUser();

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
    } = reqBody;

    const created_at = new Date();
    const updated_at = new Date();

    // Add user data to user table
    const resultFromUsers = await connectionPool.query(
      `INSERT INTO users (auth_id, username, email, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id`,
      [user.id, username, email, created_at, updated_at]
    );

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

    await connectionPool.query("COMMIT");
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during signUp:", error);
    throw error;
  }
};

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
    console.log("I'm at user Model");

    console.log(result);

    return result;
  } catch (error) {
    console.error("Error occurred during signUp:", error);
    throw error;
  }
};
