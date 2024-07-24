import React, { useEffect, useState } from "react";
import { useAuth } from "./authentication.jsx";
import axios from "axios";

const MerryLimitContext = React.createContext();

function MerryLimitProvider(props) {
  const { state } = useAuth();
  // const userId = state?.user?.id || JSON.parse(localStorage.getItem("data")).id;
  const currentUserJson = localStorage.getItem("data");
  const currentUser = JSON.parse(currentUserJson);
  const userId = currentUser.id;

  const [availableClicksToday, setAvailableClicksToday] = useState(null);
  const [maxDailyQuota, setMaxDailyQuota] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const [availableClicksResponse, maxDailyQuotaResponse] =
            await Promise.all([
              axios.get(
                `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/v1/merry/available-clicks/${userId}`
              ),
              axios.get(
                `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/v1/merry/merry-limit/${userId}`
              ),
            ]);

          const availableClicksToday =
            availableClicksResponse.data.data.availableClicksToday;
          const maxDailyQuota = maxDailyQuotaResponse.data.data.merry_limit;

          // console.log("Fetched availableClicksToday:", availableClicksToday);
          // console.log("Fetched maxDailyQuota:", maxDailyQuota);

          // localStorage.setItem(
          //   "availableClicksToday",
          //   JSON.stringify(availableClicksToday)
          // );
          // localStorage.setItem("maxDailyQuota", JSON.stringify(maxDailyQuota));

          setAvailableClicksToday(availableClicksToday);
          setMaxDailyQuota(maxDailyQuota);
        } catch (error) {
          console.error("Error fetching merry-limit data:", error);
        }
      }
    };

    fetchData();
  }, [userId]);

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
