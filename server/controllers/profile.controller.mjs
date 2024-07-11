import {
  uploadAvatar as uploadAvatarFromModel,
  getUserAvatar as getUserAvatarFromModel,
} from "../models/profile.model.mjs";

/**
 *
 * @param {object} req - The request object, contain user id.
 * @param {object} res
 * @returns - The response object, containing the information message with the json file
 * In the json file, It's the Array of Objects, In the Object it contains many key:value pairs of picture_id, profile_id, cloudinary_id, url, created_at, updated_at.
 */
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

/**
 *
 * @param {object} req - The request object, contain user id, files(Object).
 * @param {object} res - The response object, containing the response message.
 * @returns
 */
export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.params.userId;

    const uploadResult = await uploadAvatarFromModel(userId, req.files);

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
