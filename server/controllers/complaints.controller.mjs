import { createComplaint } from "../models/complaint.model.mjs";

export const fileComplaint = async (req, res) => {
  const { userId } = req.user.user_id;
  const { issue } = req.body.issue;
  const { description } = req.body.description;
  try {
    await createComplaint(userId, issue, description);
    res.status(201).json({ message: "Complaint filed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to file compalint." });
  }
};
