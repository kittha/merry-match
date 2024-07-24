import {
  addMerry as addMerryToModel,
  undoMerry as undoMerryFromModel,
} from "../models/merry.model.mjs";

export const addMerry = async (req, res) => {
  const likingUserId = req.body.userId;
  const likedUserId = req.body.merryUserId;
  try {
    await addMerryToModel(likingUserId, likedUserId);
    res.status(200).json({ message: "Merry user successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to add merry user." });
  }
};

export const undoMerry = async (req, res) => {
  const { likingUserId, likedUserId } = req.body;
  try {
    await undoMerryFromModel(likingUserId, likedUserId);
    res.status(200).json({ message: "Unmerry user successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to unmerry user." });
  }
};
