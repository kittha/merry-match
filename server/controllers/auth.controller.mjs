// import bcrypt from "bcrypt";
import { createUser } from "../models/user.model.mjs";
import { getUserRole } from "../models/auth.model.mjs";
import { signUp, signIn, getUser } from "../services/supabaseAuth.service.mjs";
import cloudinaryUpload from "../utils/cloudinary.uploader.mjs";

// POST
export const registerUser = async (req, res) => {
  try {
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

    console.log("Registering user with data:", req.body);

    // signUp via "Supabase Auth" service @/services/supabaseAuth.service.mjs
    const { data } = await signUp(req.body);
    console.log("Data after signUp with Supabase Auth: ", data);

    // upload avatar to Cloudinary; then got avatar uri & url
    let avatarUri = null;
    if (req.files) {
      console.log("Uploading avatar...");
      avatarUri = await cloudinaryUpload(req.files);
      console.log("Avatar uploaded:", avatarUri);
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

export const loginUser = async (req, res) => {
  try {
    const data = await signIn(req.body);

    if (!data || !data.user || !data.user.id) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userId = data.user.id;

    console.log("UserId is: ", userId);
    const userRole = await getUserRole(userId);
    console.log("User role is: ", userRole);

    if (userRole === "Admin") {
      res.redirect("/admin");
    } else if (userRole === "user") {
      res.redirect("/landing-page");
    } else {
      res.status(403).send("Unauthorized");
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

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
