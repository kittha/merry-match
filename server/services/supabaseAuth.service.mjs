import { supabase } from "../utils/supabaseClient.mjs";

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

/**
 * Refreshes the session using the provided old refresh token object.
 *
 * @param {Object} oldRefreshTokenObj - The old refresh token object. The structure of the input is {"refresh_token": "{{jwtRefreshToken}}"}
 * @return {Promise<Object>} The refreshed session data.
 * @throws {Error} If there is an error refreshing the access token or if no data is returned.
 */
let isRefreshing = false;
export const refreshSession = async (oldRefreshTokenObj) => {
  if (isRefreshing) return;
  isRefreshing = true;

  // console.log("oldRefreshTokenObj is : ", oldRefreshTokenObj);
  try {
    const { data, error } = await supabase.auth.refreshSession(
      oldRefreshTokenObj
    );

    // console.log("newRefreshTokenObj is : ", data?.session);
    if (error) {
      console.error("Error refreshing access token:", error.message);
      throw new Error("Failed to refresh session");
    }

    if (!data || !data.session) {
      throw new Error("No data returned from refresh access token");
    }

    return data.session;
  } catch (error) {
    console.error("Error in refreshSession function:", error.message);
    throw error;
  } finally {
    isRefreshing = false;
  }
};
