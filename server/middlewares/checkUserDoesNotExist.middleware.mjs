import { doesUserExist } from "../models/user.model.mjs";

export const checkUserDoesNotExist = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const result = await doesUserExist(email);

    if (result.rowCount > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    return next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
