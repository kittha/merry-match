// import bcrypt from "bcrypt";
// import { createUser, findUserByUsername } from "../models/user.model.mjs";
import { signUp, signIn, getUser } from "../services/auth.mjs";

// POST
export const registerUser = async (req, res) => {
  const { formData } = req.body;
  try {
    const { data } = await signUp(formData);

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
  const jwtToken = req.body;
  const user = getUser(jwtToken);

  if (!user) {
    console.error("No user is signed in");
    return null;
  }

  console.log("Authenticated user:", user);
  return user;
  try {
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
