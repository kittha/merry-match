import axios from "axios";

export const getProfileData = async (userId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`
    );
    // console.log("Get data from Database Success.");
    return data;
  } catch (error) {
    // console.error("Error at getProfileData in connectProfile: ", error);
  }
};

export const updateProfile = async (userId, inputData) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`,
      inputData
    );
    // console.log("Send data to Database Success.");
    return data;
  } catch (error) {
    // console.error("Error at updateProfile in connectProfile: ", error);
  }
};

// FIXME 'data' is not defined
export const deleteAccount = async (userId) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`,
      data
    );
    // console.log("Delete Account Success.");
    return { message: "Delete Account Success." };
  } catch (error) {
    // console.error("Error at deleteAccount in connectProfile: ", error);
  }
};
