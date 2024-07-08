import { supabase } from "../utils/supabaseClient.mjs";
import connectionPool from "../configs/db.mjs";

export const signUp = async (formData) => {
  try {
    const {
      email,
      password,
      name,
      date_of_birth,
      location,
      city,
      sexual_identities,
      sexual_preferences,
      racial_preferences,
      meeting_interests,
      bio,
    } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error from Supabase Auth:", error);
      throw error;
    }

    const result = await connectionPool.query(
      `
      INSERT INTO users (email)
      VALUES ($1)
      RETURNING user_id
      `,
      [email]
    );

    const result2 = await connectionPool.query(
      `
     INSERT INTO user_profiles (user_id, name, date_of_birth, location, city, sexual_identities, sexual_preferences, racial_preferences, meeting_interests, bio)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      [
        (userId,
        name,
        date_of_birth,
        location,
        city,
        sexual_identities,
        sexual_preferences,
        racial_preferences,
        meeting_interests,
        bio),
      ]
    );
    await client.query("COMMIT");
    console.log("User signed up successfully:", data.user.email);
    return data;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error occurred during signUp:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const signIn = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Both email and password must be provided for sign-in.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error from Supabase Auth:", error);
      throw error;
    }

    console.log("User signed in successfully");
    return data;
  } catch (error) {
    console.error("Error occurred during signIn:", error);
    throw error;
  }
};

export const getUser = async (jwtToken) => {
  try {
    const { user, error } = supabase.auth.user(jwtToken);
    if (error) {
      console.error("Error from Supabase Auth:", error);
      throw error;
    }
    return user;
  } catch (error) {
    console.error("Error occurred while fetching user:", error);
    throw error;
  }
};
