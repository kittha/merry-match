// import bcrypt from "bcrypt";
import { signUp, signIn } from "../services/supabaseAuth.service.mjs";
import { getUser, createUser } from "../models/user.model.mjs";
import cloudinaryUpload from "../utils/cloudinary.uploader.mjs";
import { createProfile } from "../models/profile.model.mjs";
import { createProfilePicture } from "../models/profilePicture.mjs";
import { getRole } from "../models/role.model.mjs";

/**
 * Register User for the Merry Match application.
 *
 * @param {object} req - The request object, contain many key:value of form input. For example: username, email, password, avatar, hobbies[]
 * @param {object} res - The response object, used to send response back to the client If register is success or failure.
 * @returns
 */
export const registerUser = async (req, res) => {
  try {
    // TODO: check datetime format

    // console.log("Registering user with data:", req.body);

    // // signUp via "Supabase Auth" service @/services/supabaseAuth.service.mjs
    // const { data } = await signUp(req.body);
    // console.log("Data after signUp with Supabase Auth: ", data);

    // upload avatar to Cloudinary; then got avatar uri & url
    let avatarUri = null;
    if (Object.keys(req.files).length !== 0) {
      avatarUri = await cloudinaryUpload(req.files);
      console.log("Avatar uploaded");
    } else {
      console.log("No avatar provided.");
    }

    // `task:infoDB` register user information into our own database @/models/user.model.mjs
    const { user_id } = await createUser(req.body);
    const { profile_id } = await createProfile(user_id, req.body);
    await createProfilePicture(profile_id, avatarUri);
    console.log("User registration completed");

    return res.status(201).json({
      message: `User has been created successfully`,
    });
  } catch (error) {
    console.error("Error occurred during user registration:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Login User for the Merry Match application.
 *
 * @param {object} req - The request object, contain key:value of usename and password.
 * @param {object} res - The response object, used to send response back to the client If login is success or failure.
 * @returns
 */
export const loginUser = async (req, res) => {
  try {
    const { session } = await signIn(req.body);
    console.log("get session from supabase auth");

    const { user, avatars } = await getUser(session.user.email);
    console.log("get data from database");

    const { name } = await getRole(user.role_id);

    const avatarsUrl = avatars.map((avatar) => avatar.url);

    const data = {
      id: user.user_id,
      username: user.username,
      role: name,
      avatars: avatarsUrl,
      session,
    };

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Fetch User details (from table users, user_profiles, hobbies, avatars) from the Merry Match application.
 *
 * @param {object} req - The request object, contain jwt token.
 * @param {object} res - The response object, used to send data (from table users, user_profiles, hobbies, profile_pictures) and response back to the client.
 * @returns
 */
export const fetchUser = async (req, res) => {
  try {
    const jwtToken = req.body;
    const user = getUser(jwtToken);

    if (!user) {
      console.error("No user is signed in");
      return null;
    }

    console.log("Authenticated user:", user);
    return user;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
