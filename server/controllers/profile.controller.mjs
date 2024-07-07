import {
  updateAvatar as updateAvatarFromModel,
  getUserAvatar as getUserAvatarFromModel,
} from "../models/profile.model.mjs";

// GET
export const getUserAvatar = async (req, res) => {
  try {
    const userId = req.params.userId;

    const getAvatarResult = await getUserAvatarFromModel(userId);
    console.log(getAvatarResult);
    return res.status(200).json({
      message: "200 OK: Successfully retrieved the list of avatars.",
      data: getAvatarResult,
    });
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    return res.status(500).json({
      message: "Server could not process the request due to database issue.",
    });
  }
};

// POST
export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.params.userId;

    const uploadResult = await updateAvatarFromModel(userId, req.files);

    if (!uploadResult) {
      return res.status(500).json({
        message: "Avatar upload failed.",
      });
    }

    return res.status(200).json({
      message: "Avatar uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return res.status(500).json({
      message: "Server could not process the request due to database issue.",
    });
  }
};
