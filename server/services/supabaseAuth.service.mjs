import { supabase } from "../utils/supabaseClient.mjs";
import connectionPool from "../configs/db.mjs";

export const signUp = async (reqBody) => {
  try {
    const { email, password } = reqBody;

    if (!email || !password) {
      throw new Error(
        "Both username, email, password must be provided for sign-up."
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error from Supabase Auth:", error);
      throw error;
    }

    console.log("User signed up successfully:");
    return data;
  } catch (error) {
    console.error("Error occurred during signIn:", error);
    throw error;
  }
};

export const signIn = async (reqBody) => {
  try {
    const { email, password } = reqBody;
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

// export const getUser = async (jwtToken) => {
//   try {
//     const { user, error } = supabase.auth.user(jwtToken);
//     if (error) {
//       console.error("Error from Supabase Auth:", error);
//       throw error;
//     }
//     return user;
//   } catch (error) {
//     console.error("Error occurred while fetching user:", error);
//     throw error;
//   }
// };

export const refreshSession = async (oldRefreshTokenObj) => {
  try {
    const { data, error } = await supabase.auth.refreshSession(
      oldRefreshTokenObj
    );
    if (error) {
      console.error("Error refreshing access token:", error.message);
      throw new Error("Failed to refresh session");
    }

    if (!data) {
      throw new Error("No data returned from refresh access token");
    }

    return data;
  } catch (error) {
    console.error("Error in refreshSession function:", error.message);
    throw error;
  }
};
