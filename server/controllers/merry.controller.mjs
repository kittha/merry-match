import {
  addMerry as addMerryToModel,
  undoMerry as undoMerryFromModel,
  getPotentialMatches as getPotentialMatchesFromModel,
  getPotentialMatchesFilter as getPotentialMatchesFilterFromModel,
  getAvailableMatches as getAvailableMatchesFromModel,
} from "../models/merry.model.mjs";
import transformMatchedData from "../utils/transformMatchedData.mjs";

/**
 * Adds a merry user by calling the `addMerryToModel` function with the provided user IDs.
 *
 * @param {Object} req - The request object containing the `userId` and `merryUserId`.
 * @param {Object} res - The response object used to send the result of the operation.
 * @param {string} req.params.userId - The user ID whose matches are being retrieved.
 * @return {Promise<void>} A promise that resolves when the user is successfully added, or rejects with an error if the operation fails.
 */
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

/**
 * Unmerry a user by updating the status of the user in the database.
 *
 * @param {Object} req - The request object containing the user ID and the ID of the user to be unmerryed.
 * @param {Object} res - The response object used to send the result of the operation.
 * @param {string} req.params.userId - The user ID whose matches are being retrieved.
 * @return {Promise<void>} - A promise that resolves when the user is successfully unmerryed, or rejects with an error if the operation fails.
 */
export const undoMerry = async (req, res) => {
  const { userId, merryUserId } = req.body;
  try {
    await undoMerryFromModel(userId, merryUserId);
    res.status(200).json({ message: "Unmerry user successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to unmerry user." });
  }
};

/**
 * Retrieves the list of potential matches for a given user ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.userId - The user ID whose matches are being retrieved.
 * @returns {Promise<void>} - The function returns no value, but sends a JSON response through `res`.
 *                            If successful, it returns a list of matches with a 200 status code.
 *                            On failure, it returns an error message with a 500 status code.
 */
export const getMatchListByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await getPotentialMatchesFromModel(userId);
    const matches = transformMatchedData(result);
    res.status(200).json({ user_id: userId, matches });
  } catch (error) {
    res.status(500).json({ error: "Failed to get match list." });
  }
};

export const getMatchListByUserIdFilter = async (req, res) => {
  const filter = req.query;
  const { userId } = req.params;

  try {
    const result = await getPotentialMatchesFilterFromModel(userId, filter);
    const matches = transformMatchedData(result);
    res.status(200).json({ user_id: userId, matches });
  } catch (error) {
    res.status(500).json({ error: "Failed to get match list." });
  }
};

/**
 * Retrieves the list of available matches for a given user ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.userId - The user ID whose matches are being retrieved.
 * @returns {Promise<void>} - The function returns no value, but sends a JSON response through `res`.
 *                            If successful, it returns a list of available matches with a 200 status code.
 *                            On failure, it returns an error message with a 500 status code.
 */
export const getAvailableMatchesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await getAvailableMatchesFromModel(userId);
    const matches = transformMatchedData(result);
    res.status(200).json({ user_id: userId, matches });
  } catch (error) {
    res.status(500).json({ error: "Failed to get available matches." });
  }
};
