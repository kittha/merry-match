import React, { useEffect, useState } from "react";
import { useAuth } from "./authentication";
import axios from "axios";

const MerryLimitContext = React.createContext();

function MerryLimitProvider(props) {
  const { state } = useAuth();
  const userId = state?.id;
  const [availableClicksToday, setAvailableClicksToday] = useState(null);
  const [maxDailyQuota, setMaxDailyQuota] = useState(null);

  useEffect(() => {
    const getAvailableClicksToday = async () => {
      if (userId) {
        try {
          const result = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/v1/merry/merry-limit/${userId}`
          );
          const { availableClicksToday, maxDailyQuota } = result.data;
          setAvailableClicksToday(availableClicksToday);
          setMaxDailyQuota(maxDailyQuota);
        } catch (error) {
          console.error("Error fetching merry-limit data:", error);
        }
      }
    };
    getAvailableClicksToday();
  }, [userId]);

  useEffect(() => {
    const updateAvailableClicksToday = async () => {
      if (userId !== null && availableClicksToday !== null) {
        const body = { availableClicksToday };

        try {
          await axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/v1/merry/merry-limit/${userId}`,
            body
          );
        } catch (error) {
          console.error("Error updating available clicks:", error);
        }
      }
    };
    updateAvailableClicksToday();
  }, [availableClicksToday, userId]);

  return (
    <MerryLimitContext.Provider
      value={{
        availableClicksToday,
        setAvailableClicksToday,
        maxDailyQuota,
        setMaxDailyQuota,
      }}
    >
      {props.children}
    </MerryLimitContext.Provider>
  );
}

const useMerryLimit = () => React.useContext(MerryLimitContext);
export { MerryLimitProvider, useMerryLimit };
