import axios from "axios";

export const getPrevMessages = async (matchId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/messages/${matchId}`
    );
    console.log("Get data from Database Success.");
    return data;
  } catch (error) {
    console.error("Error at getPrevMessages in connectMsg: ", error);
  }
};

export const createMessage = async (matchId, data) => {
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/messages/${matchId}`,
      data
    );
    console.log("Post data to Database Success.");
    return data;
  } catch (error) {
    console.error("Error at createMessage in connectMsg: ", error);
  }
};

export const getMatchInfo = async (matchId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/match/${matchId}`
    );
    console.log("Get data from Database Success.");
    return data;
  } catch (error) {
    console.error("Error at getMatchInfo in connectMsg: ", error);
  }
};
