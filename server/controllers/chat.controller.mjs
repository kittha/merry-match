import {
  createMessage,
  getMessages,
  createMedia,
} from "../models/chat.model.mjs";
import { cloudinaryUpload } from "../utils/cloudinary.uploader.mjs";

export const sendMessage = async (req, res) => {
  try {
    let mediaId;
    console.log("files", req.files);
    if (req.files) {
      const Uri = await cloudinaryUpload(req.files);
      console.log("Uri", Uri[0]);
      const { media_id } = await createMedia(Uri[0]);
      console.log("mediaId", media_id);
      mediaId = media_id;
    }
    const result = await createMessage({ ...req.body, mediaId });
    console.log("result in sendMessage: ", result);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in message controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getChatHistory = async (req, res) => {
  const { matchId } = req.params;
  try {
    // console.log(matchId);
    const result = await getMessages(matchId);
    const data = result.map((msg) => ({
      sender: msg.sender_id,
      receiver: msg.receiver_id,
      matchId,
      message: msg.message,
      dateTime: msg.sent_at,
    }));
    // console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in message controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
