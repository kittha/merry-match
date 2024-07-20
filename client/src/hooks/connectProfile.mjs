import axios from "axios";

export const getProfileData = async (userId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`
    );
    console.log("Get data from Database Success.");
    return data;
  } catch (error) {
    console.error("Error at getProfileData in connectProfile: ", error);
  }
};

export const updateProfile = async (userId, data) => {
  try {
    const result = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`,
      data
    );
    console.log("Send data to Database Success.");
    return { message: "Get data from Database Success." };
  } catch (error) {
    console.error("Error at putProfileData in connectProfile: ", error);
  }
};
