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
    const avatars = resultAvatars.map((avatar) => ({
      url: avatar.url,
    }));
    console.log(avatars);

    const data = {
      username,
      email,
      name,
      birthday: date_of_birth,
      country: location,
      city,
      sexualIdentity: sexual_identities,
      sexualPreference: sexual_preferences,
      racialPreference: racial_preferences,
      meetingInterest: meeting_interests,
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
    // console.log(req.body.avatar);
    let avatarUrl = req.body.avatar;
    if (Array.isArray(avatarUrl)) {
      avatarUrl = req.body.avatar.map((avatar) => JSON.parse(avatar));
    } else {
      avatarUrl = [avatarUrl];
    }

    await updateUser(userId, req.body);
    await updateProfile(userId, req.body);

    const avatarUri = await cloudinaryUpload(req.files);

    // rearrange avatars
    let i = 0;
    let j = 0;
    let avatars = [];
    for (let k = 0; k < 5; k++) {
      if (avatarUrl[i] && k in avatarUrl[i]) {
        console.log(avatarUrl[i][k]);
        avatars.push(avatarUrl[i][k]);
        i++;
      } else if (avatarUri && avatarUri[j]) {
        console.log(avatarUri[j]);
        avatars.push(avatarUri[j]);
        j++;
      }
    }
    // console.log(avatars);

    // update profile picture in database
    const avatarsResult = await upsertAvatars(userId, avatars);

    // delete avatars from cloudinary
    // *still can't delete from cloudinary
    // const cloudinaryId = avatarsResult.map((record) => record.cloudinary_id);
    // await cloudinaryDestroy(cloudinaryId);

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
    const { auth_id } = await deleteUser(userId);
    const { data, error } = await supabase.auth.admin.deleteUser(auth_id);
    // delete user from database
    // delete avatars from cloudinary
    // *still can't delete from cloudinary
    // const avatarsResult = getAvatars(userId);
    // const cloudinaryId = avatarsResult.map((record) => record.cloudinary_id);
    // await cloudinaryDestroy(cloudinaryId);
    // delete user from supabase auth
  } catch (error) {
    console.error("Error in delete profile controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
