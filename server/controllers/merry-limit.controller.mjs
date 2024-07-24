import {
  getMerryLimit as getMerryLimitFromModel,
  updateAvailableClicksToday as updateAvailableClicksTodayFromModel,
} from "../models/merry-limit.model.mjs";

export const getMerryLimitByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID." });
  }
  try {
    const userMerryLimit = await getMerryLimitFromModel(Number(userId));
    res.status(200).json({
      message: "Get merry-limit successfully.",
      data: userMerryLimit,
    });
  } catch (error) {
    console.error("Error fetching merry-limit:", error);
    res.status(500).json({ error: "Failed to get merry-limit." });
  }
};

export const updateAvailableClicksToday = async (req, res) => {
  const { userId } = req.params;
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID." });
  }
  try {
    const availableClicksToday = await updateAvailableClicksTodayFromModel(
      Number(userId)
    );
    res.status(200).json({
      message: "Get todays available click successfully.",
      data: availableClicksToday,
    });
  } catch (error) {
    console.error("Error fetching merry-limit:", error);
    res.status(500).json({ error: "Failed to get merry-limit." });
  }
};
