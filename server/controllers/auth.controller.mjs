// import bcrypt from "bcrypt";
import { createrUser } from "../models/user.model.mjs";
import { getUserRole } from "../models/auth.model.mjs";
import { signUp, signIn, getUser } from "../services/supabaseAuth.service.mjs";

// POST
export const registerUser = async (req, res) => {
  // multipart/form-data incoming
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

    // `task:auth` signUp via "Supabase Auth" service @/services/supabaseAuth.service.mjs
    const { data } = await signUp(req.body);

    // `task:infoDB` register user information into our own database @/models/user.model.mjs
    const result = await createrUser(req);

    console.log("Created user_id:", result);

    return res.status(201).json({
      message: `User ${result} has been created successfully`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const data = await signIn(req.body);

    const userId = data.user.id;

    const userRole = await getUserRole(userId);

    if (userRole === "Admin") {
      res.redirect("/admin");
    } else if (userRole === "user") {
      res.redirect("/landing-page");
    } else {
      res.status(403).send("Unauthorized");
    }
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
