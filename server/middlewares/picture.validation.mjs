export const validatePicture = (req, res, next) => {
  const numberOfPictures = req.files.avatar;

  if (
    !req.files ||
    Object.keys(numberOfPictures).length < 2 ||
    Object.keys(numberOfPictures).length > 5
  ) {
    return res
      .status(400)
      .json({ error: "You must upload between 2 to 5 images." });
  }
  next();
};
