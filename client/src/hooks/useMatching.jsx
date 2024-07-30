import { useEffect, useState } from "react";
import axios from "axios";
import { useMerryLimit } from "../contexts/MerryLimitProvider";

// Example of Customs Hook usage look at: /merry-match/client/src/components/matchingpage/matching/SwipeCard.jsx
const useMatching = (currentUserId) => {
  const [userQueue, setUserQueue] = useState([]);
  const { availableClicksToday, setAvailableClicksToday, maxDailyQuota } =
    useMerryLimit();
  // const [availableClicksToday, setAvailableClicksToday] = useState(0);

  const getPotentialMatches = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/merry/available-matches/${currentUserId}`
      );
      console.log(response.data);

      if (Array.isArray(response.data.matches.matches)) {
        setUserQueue(response.data.matches.matches);
      } else {
        console.error("API response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch potential matches:", error);
    }
  };

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

  const undoMerry = async (unlikedUserId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/merry/undoMerry/`,
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
