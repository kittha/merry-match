export const validatePicture = (req, res, next) => {
  const numberOfPictures = req.files.avatar;

  if (!req.files || Object.keys(numberOfPictures).length < 2) {
    return res
      .status(400)
      .json({ error: "You must upload at least 2 images." });
  }
  next();
};
