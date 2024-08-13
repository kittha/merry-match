export const validateSignUpInput = (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Username, password, and email are required." });
  }
  return next();
};
