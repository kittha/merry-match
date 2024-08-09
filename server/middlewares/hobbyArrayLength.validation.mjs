export const validateHobbiesArrayLength = (req, res, next) => {
  const { hobbies } = req.body;

  if (!Array.isArray(hobbies) || hobbies.length > 10) {
    return res
      .status(400)
      .json({ error: "Hobbies must be an array with at most 10 elements." });
  }

  return next();
};
