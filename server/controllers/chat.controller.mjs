import {
  createMessage,
  getMessages,
  createMedia,
  getLastMessages,
} from "../models/chat.model.mjs";
import { getAllMatch } from "../models/matching.model.mjs";
import { cloudinaryUpload } from "../utils/cloudinary.uploader.mjs";

export const sendMessage = async (req, res) => {
  try {
    let mediaResult;
    // console.log("req", req.body);
    // console.log("files", req.files);
    //add photo to database
    const Uri = await cloudinaryUpload(req.files);
    // console.log("Uri", Uri);
    if (Uri) {
      mediaResult = await createMedia(Uri[0]);
      // console.log("mediadata", mediaResult);
    }
    const mediaId = mediaResult?.media_id;
    //add message to database
    const msgResult = await createMessage({ ...req.body, mediaId });
    console.log("result in createMessage: ", msgResult);

    const data = {
      sender: msgResult.sender_id,
      receiver: msgResult.receiver_id,
      matchId: msgResult.match_id,
      message: msgResult.message,
      media: mediaResult?.url,
      dateTime: msgResult.sent_at,
    };

    console.log("msgdata", data);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in chat controller:", error);
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
      matchId: msg.match_id,
      message: msg.message,
      media: msg.url,
      dateTime: msg.sent_at,
    }));
    // console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in chat controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkLastMessage = async (req, res) => {
  const { userId } = req.params;
  try {
    const matchResult = await getAllMatch(userId);
    const matchIds = matchResult.map((result) => result.match_id);
    // console.log(matchIds);
    const lastResult = await getLastMessages(matchIds);
    const data = lastResult.map((msg) => ({
      sender: msg.sender_id,
      receiver: msg.receiver_id,
      matchId: msg.match_id,
      message: msg.message,
      dateTime: msg.sent_at,
    }));
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in chat controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
