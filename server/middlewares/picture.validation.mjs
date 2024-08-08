export const validatePicture = (req, res, next) => {
  // let avatarUrl = req.body.avatar;
  if (Array.isArray(req.body.avatar)) {
    req.body.avatar = req.body.avatar.map((avatar) => JSON.parse(avatar));
  } else {
    req.body.avatar = [JSON.parse(req.body.avatar)];
  }

  const numberOfUrl = req.body.avatar?.length;
  // console.log("url", numberOfUrl);
  const numberOfFile = req.files.avatar?.length;
  // console.log("file", numberOfFile);

  let numberOfPictures = 0;
  if (numberOfFile) {
    numberOfPictures += numberOfFile;
  }
  if (numberOfUrl) {
    numberOfPictures += numberOfUrl;
  }

  if (numberOfPictures < 2 || numberOfPictures > 5) {
    return res
      .status(400)
      .json({ error: "You must upload between 2 to 5 images." });
  }
  next();
};
