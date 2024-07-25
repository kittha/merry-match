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
  // console.log("currentUser: ", currentUser);
  // console.log("userId: ", userId);

  const [availableClicksToday, setAvailableClicksToday] = useState(0);
  const [maxDailyQuota, setMaxDailyQuota] = useState(0);

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

        // console.log(availableClicksResponse.data);
        // console.log(maxDailyQuotaResponse.data);

        const availableClicksToday =
          availableClicksResponse.data.data.availableClicksToday;
        const maxDailyQuota = maxDailyQuotaResponse.data.data.merry_limit;

        // console.log("Fetched availableClicksToday:", availableClicksToday);
        // console.log("Fetched maxDailyQuota:", maxDailyQuota);

        setAvailableClicksToday(availableClicksToday);
        setMaxDailyQuota(maxDailyQuota);
      } catch (error) {
        // console.error("Error fetching merry-limit data:", error);
        // console.log("User doesn't use any merry quota today");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [availableClicksToday]);

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
