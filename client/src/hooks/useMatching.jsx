import { useState } from "react";
import axios from "axios";
import { useMerryLimit } from "./userMerryLimit";

/**
 * Custom React hook that manages the matching functionality for a given user.
 *
 * @param {string} currentUserId - The ID of the current user.
 * @return {Object} An object containing the following properties and methods:
 *   - getPotentialMatches: A function that retrieves potential matches for the current user by sending a GET request to the server.
 *   - userQueue: The current user queue state.
 *   - setUserQueue: A function to update the user queue state.
 *   - availableClicksToday: The current available clicks today state.
 *   - maxDailyQuota: The maximum daily quota.
 *   - addMerry: A function that sends a POST request to add a "merry" status for a given user.
 *   - undoMerry: A function that undoes a "merry" status (POST "unmatch" status) for a given user.
 */
const useMatching = (currentUserId) => {
  const [userQueue, setUserQueue] = useState([]);
  const { availableClicksToday, setAvailableClicksToday, maxDailyQuota } =
    useMerryLimit();

  /**
   * Retrieves potential matches for the current user by sending a GET request to the server.
   *
   * @return {Promise<void>} - A Promise that resolves when the potential matches are successfully retrieved.
   *                          If the API response is not an array, an error message will be logged to the console.
   *                          If there is an error while fetching the potential matches, an error message will be logged to the console.
   */
  const getPotentialMatches = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/merry/available-matches/${currentUserId}`
      );

      if (Array.isArray(response.data.matches.matches)) {
        setUserQueue(response.data.matches.matches);
      } else {
        console.error("API response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch potential matches:", error);
    }
  };

  /**
   * Sends a POST request to add a "merry" status for a given user.
   *
   * @param {string} likedUserId - The ID of the user being added as a "merry" user.
   * @return {Promise<void>} - A Promise that resolves when the "merry" status is successfully added.
   */
  const addMerry = async (likedUserId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/merry/addMerry`,
        { userId: currentUserId, merryUserId: likedUserId }
      );
      setAvailableClicksToday((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to add merry:", error);
    }
  };

  /**
   * Undoes a "merry" status (POST "unmatch" status) for a given user.
   *
   * @param {string} unlikedUserId - The ID of the user whose "merry" status is being undone.
   * @return {Promise<void>} - A Promise that resolves when the "merry" status is successfully undone.
   */
  const undoMerry = async (unlikedUserId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/merry/undoMerry`,
        { userId: currentUserId, merryUserId: unlikedUserId }
      );
    } catch (error) {
      console.error("Failed to undo merry:", error);
    }
  };

  return {
    getPotentialMatches,
    userQueue,
    setUserQueue,
    availableClicksToday,
    maxDailyQuota,
    addMerry,
    undoMerry,
  };
};

export default useMatching;
