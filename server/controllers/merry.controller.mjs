import {
  addMerry as addMerryToModel,
  undoMerry as undoMerryFromModel,
  getPotentialMatches as getPotentialMatchesFromModel,
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

export const getMatchListByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const matches = await getPotentialMatchesFromModel(userId);
    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ error: "Failed to get match list." });
  }
};
