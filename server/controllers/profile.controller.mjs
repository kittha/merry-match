import cloudinary from "../configs/cloudinary.config.mjs";
import { getProfile, updateProfile } from "../models/profile.model.mjs";
import { getAvatars, upsertAvatars } from "../models/profilePicture.model.mjs";
import { deleteUser, getUser, updateUser } from "../models/user.model.mjs";
import {
  cloudinaryUpload,
  cloudinaryDestroy,
} from "../utils/cloudinary.uploader.mjs";

export const getUserProfileById = async (req, res) => {
  const { userId } = req.params;
  try {
    const { username, email } = await getUser(userId);
    const {
      name,
      date_of_birth,
      location,
      city,
      sexual_identities,
      sexual_preferences,
      racial_preferences,
      meeting_interests,
      hobbies,
      bio,
    } = await getProfile(userId);
    const resultAvatars = await getAvatars(userId);
    const avatars = resultAvatars.map((avatar) => avatar.url);

    const data = {
      username,
      email,
      name,
      date_of_birth,
      location,
      city,
      sexual_identities,
      sexual_preferences,
      racial_preferences,
      meeting_interests,
      hobbies,
      bio,
      avatars,
    };
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in get profile controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateUserProfileById = async (req, res) => {
  const { userId } = req.params;
  try {
    await updateUser(userId, req.body);
    await updateProfile(userId, req.body);
    //กรณี url เดิมทำยังไง
    avatarUri = await cloudinaryUpload(req.files);
    // update profile picture in database
    const avatarsResult = await upsertAvatars(userId, avatarUri);
    // delete avatars from cloudinary
    const cloudinaryId = avatarsResult.map((record) => record.cloudinary_id);
    await cloudinaryDestroy(cloudinaryId);

    return res.status(200).json({ message: "Updated Successful" });
  } catch (error) {
    console.error("Error in update profile controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    // delete avatars from cloudinary
    const avatarsResult = getAvatars(userId);
    const cloudinaryId = avatarsResult.map((record) => record.cloudinary_id);
    await cloudinaryDestroy(cloudinaryId);
    // delete user from supabase auth
    const { auth_id } = getUser(userId);
    const { data, error } = await supabase.auth.admin.deleteUser(auth_id);
    // delete user from database
    await deleteUser(userId);
  } catch (error) {
    console.error("Error in delete profile controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
