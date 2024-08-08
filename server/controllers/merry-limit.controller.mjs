import {
  getMerryLimit as getMerryLimitFromModel,
  getAvailableClicksTodayByUserId as getAvailableClicksTodayFromModel,
} from "../models/merry-limit.model.mjs";

export const getMerryLimitByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID." });
  }
  try {
    const userMerryLimit = await getMerryLimitFromModel(Number(userId));

    return res.status(200).json({
      message: "Get merry-limit successfully.",
      data: userMerryLimit,
    });
  } catch (error) {
    console.error("Error fetching merry-limit:", error);
    res.status(500).json({ error: "Failed to get merry-limit." });
  }
};

export const getAvailableClicksTodayByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID." });
  }

  const availableClicksToday = await getAvailableClicksTodayFromModel(
    Number(userId)
  );

  return res.status(200).json({
    message: "Get todays available click successfully.",
    data: availableClicksToday,
  });
};
