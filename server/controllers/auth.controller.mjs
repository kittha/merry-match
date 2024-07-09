// import bcrypt from "bcrypt";
import { createrUser } from "../models/user.model.mjs";
import { signUp, signIn, getUser } from "../services/supabaseAuth.service.mjs";

// POST
export const registerUser = async (req, res) => {
  try {
    const { formData } = req.body;

    // `task:auth` signUp via "Supabase Auth" service @/services/supabaseAuth.service.mjs
    const { data } = await signUp(formData);

    // `task:infoDB` register user information into our own database @/models/user.model.mjs
    const result = await createrUser(formData);

    return res.status(200).json({
      message: `User ${data.user.email} has been created successfully`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await signIn(email, password);

    return res.status(200).json({
      message: "User signed in successfully.",
      data: data,
    });
  } catch (error) {
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
