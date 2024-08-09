export const validateComplaintStatus = (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Please provide complaint status." });
  }
  return next();
};
