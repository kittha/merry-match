import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMerryLimit } from "../hooks/userMerryLimit";
import { useAuth } from "./authentication";

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
const MatchContext = React.createContext();

// this is a hook that consume MatchContext
const useMatch = () => React.useContext(MatchContext);

function MatchProvider(props) {
  // const currentUserJson = localStorage.getItem("data");
  // const currentUser = JSON.parse(currentUserJson);
  // const currentUserId = currentUser.id;
  const { state } = useAuth();
  const currentUserId = state.user?.id;

  const [allUser, setAllUser] = useState([]);
  const {
    availableClicksToday,
    setAvailableClicksToday,
    maxDailyQuota,
    setMaxDailyQuota,
  } = useMerryLimit();

  useEffect(() => {
    if (currentUserId) {
      getPotentialMatches();
    }
  }, [currentUserId]);

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
        }/api/v1/merry/match/${currentUserId}`
      );
      // console.log(response.data.matches);
      if (Array.isArray(response.data.matches)) {
        setAllUser(response.data.matches);
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/merry/addMerry`,
        { userId: currentUserId, merryUserId: likedUserId }
      );
      setAvailableClicksToday((prev) => prev + 1);
      let newUser = [...allUser];
      console.log("data", data);
      newUser = newUser.map((user) => {
        if (
          user.user_id === data.user_id_1 ||
          user.user_id === data.user_id_2
        ) {
          const update = {
            ...user,
            match_id: data.match_id,
            match_created_at: data.created_at,
            match_matched_at: data.matched_at,
            match_user_id_1: data.user_id_1,
            match_user_id_2: data.user_id_2,
            match_status_1: data.status_1,
            match_status_2: data.status_2,
          };
          return update;
        }
        return user;
      });

      console.log("new", newUser);
      setAllUser(newUser);
      return data;
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

  return (
    <MatchContext.Provider
      value={{
        allUser,
        availableClicksToday,
        maxDailyQuota,
        addMerry,
        undoMerry,
        setMaxDailyQuota,
      }}
    >
      {props.children}
    </MatchContext.Provider>
  );
}

export { MatchProvider, useMatch };
