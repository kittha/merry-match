// import bcrypt from "bcrypt";
import { createUser, getUserRole } from "../models/auth.model.mjs";
import { signUp, signIn } from "../services/supabaseAuth.service.mjs";
import { getUser } from "../models/user.model.mjs";
import cloudinaryUpload from "../utils/cloudinary.uploader.mjs";

/**
 * Register User for the Merry Match application.
 *
 * @param {object} req - The request object, contain many key:value of form input. For example: username, email, password, avatar, hobbies[]
 * @param {object} res - The response object, used to send response back to the client If register is success or failure.
 * @returns
 */
export const registerUser = async (req, res) => {
  try {
    // check datetime format
    // validate required input
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      console.error(
        "Both username, email, password must be provided for sign-in."
      );
      return res
        .status(401)
        .json({ message: "Invalid username, email, or password" });
    }

    // console.log("Registering user with data:", req.body);

    // signUp via "Supabase Auth" service @/services/supabaseAuth.service.mjs
    // const { data } = await signUp(req.body);
    // console.log("Data after signUp with Supabase Auth: ", data);

    // upload avatar to Cloudinary; then got avatar uri & url
    let avatarUri = null;
    console.log(Object.keys(req.files).length);
    if (Object.keys(req.files).length !== 0) {
      avatarUri = await cloudinaryUpload(req.files);
      // console.log("Avatar uploaded:", avatarUri);
    } else {
      console.log("No avatar provided.");
    }

    // `task:infoDB` register user information into our own database @/models/user.model.mjs
    console.log("Creating user in database...");
    await createUser(req.body, avatarUri);
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

    const data = {
      username: user.username,
      avatars,
      session,
    };

    // if (!data || !data.user || !data.user.id) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    // const authId = data.user.id;

    // console.log("authId is: ", authId);
    // const userRole = await getUserRole(authId);
    // console.log("User role is: ", userRole);

    // if (userRole === "Admin") {
    //   res.redirect("/admin");
    // } else if (userRole === "user") {
    //   res.redirect("/landing-page");
    // } else {
    //   res.status(403).send("Unauthorized");
    // }

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
