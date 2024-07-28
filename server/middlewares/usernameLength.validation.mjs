export const validateUsernameLength = (req, res, next) => {
  const { username } = req.body;

  if (!username || username.length <= 5) {
    return res
      .status(400)
      .json({ error: "Username must be longer than 6 characters." });
  }
  next();
};
