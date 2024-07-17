import { createComplaint } from "../models/complaint.model.mjs";

export const fileComplaint = async (req, res) => {
  const userId = req.body.userId;
  const issue = req.body.issue;
  const description = req.body.description;
  try {
    const result = await createComplaint(userId, issue, description);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to file compalint." });
  }
};
