export const validatePasswordLength = (req, res, next) => {
  const { password } = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be longer than 8 characters." });
  }
  next();
};
