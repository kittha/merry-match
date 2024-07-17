export const bioCharacterLength = (req, res, next) => {
  const { bio } = req.body;

  if (bio && bio.length >= 150) {
    return res
      .status(400)
      .json({ error: "Bio must not be longer than 150 characters." });
  }
  next();
};
