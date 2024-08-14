import axios from "axios";

export const getPrevMessages = async (matchId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/messages/${matchId}`
    );
    // console.log("Get data from Database Success.");
    return data;
  } catch (error) {
    // console.error("Error at getPrevMessages in connectMsg: ", error);
  }
};

export const createMessage = async (sendData) => {
  // console.log("creatMessage", sendData);
  const sentFormData = new FormData();
  for (let key in sendData) {
    if (sendData[key] instanceof File) {
      sentFormData.append("avatar", sendData[key]);
    } else if (sendData[key] instanceof Date) {
      sentFormData.append(key, sendData[key].toISOString());
    } else if (sendData[key]) {
      sentFormData.append(key, sendData[key]);
    }
  }

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/messages/${sendData.matchId}`,
      sentFormData
    );
    // console.log("Post data to Database Success.", data);
    return data;
  } catch (error) {
    // console.error("Error at createMessage in connectMsg: ", error);
  }
};

export const getMatchInfo = async (matchId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/match/${matchId}`
    );
    // console.log("Get data from Database Success.");
    return data;
  } catch (error) {
    // console.error("Error at getMatchInfo in connectMsg: ", error);
  }
};

export const getLastMessagesByUserId = async (userId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/messages/last/${userId}`
    );
    // console.log("Get data from Database Success.");
    return data;
  } catch (error) {
    // console.error("Error at getLastMessagesByUserId in connectMsg: ", error);
  }
};
