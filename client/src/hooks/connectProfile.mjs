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
    console.error("Error at updateProfile in connectProfile: ", error);
  }
};

export const deleteAccount = async (userId) => {
  try {
    const result = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`,
      data
    );
    console.log("Delete Account Success.");
    return { message: "Delete Account Success." };
  } catch (error) {
    console.error("Error at deleteAccount in connectProfile: ", error);
  }
};

export const updateUserStatus = async (userId, newStatus) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/merry-list/${userId}`,
    {
      userId,
      status_1: newStatus,
    }
  );
  return response.data;
};
