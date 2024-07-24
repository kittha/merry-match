import React, { useEffect, useState } from "react";
import { useAuth } from "./authentication.jsx";
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
          // const result = await axios.get(
          //   `${
          //     import.meta.env.VITE_BACKEND_URL
          //   }/api/v1/merry/merry-limit/${userId}`
          // );
          const result = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/merry/merry-limit/15`
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

  // 24-hours countdown timer
  useEffect(() => {
    const checkAndResetDailyQuota = () => {
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset() * 60000;
      const utc7 = new Date(now.getTime() + timezoneOffset + 7 * 3600000);
      const currentDate = utc7.toISOString().split("T")[0]; // format to YYYY-MM-DD

      const lastResetDate = localStorage.getItem("lastResetDate");

      if (lastResetDate !== currentDate) {
        setAvailableClicksToday(maxDailyQuota); // Reset available clicks
        localStorage.setItem("lastResetDate", currentDate);
      }
    };

    checkAndResetDailyQuota();

    const intervalId = setInterval(checkAndResetDailyQuota, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [maxDailyQuota]);

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
