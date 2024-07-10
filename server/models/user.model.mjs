import connectionPool from "../configs/db.mjs";
import { supabase } from "../utils/supabaseClient.mjs";

export const createUser = async (reqBody) => {
  try {
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
      avatars,
      hobbies,
    } = reqBody;

    const created_at = new Date();
    const updated_at = new Date();

    // Add user data to user_profile table
    const resultFromUsers = await connectionPool.query(
      `INSERT INTO users (auth_id, username, email, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id`,
      [user.id, username, email, created_at, updated_at]
    );

    const { user_id } = resultFromUsers.rows[0];
    // Add user data to users table
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
    for (tag of hobbies) {
      await connectionPool.query(
        `INSERT INTO hobbies (profile_id, content, created_at, updated_at)
        VALUES ($1, $2, $3, $4)`,
        [profile_id, tag, created_at, updated_at]
      );
    }

    // Add profile pictures to profile_pictures table
    // fileUrls = [{
    //   url: result.secure_url,
    //   publicId: result.public_id,
    // }, ...];
    for (file of avatars) {
      await connectionPool.query(
        `INSERT INTO profile_pictures (profile_id, cloudinary_id, url, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5)`,
        [profile_id, file.publicId, file.url, created_at, updated_at]
      );
    }
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error occurred during signUp:", error);
    throw error;
  } finally {
    connectionPool.release();
  }
};
