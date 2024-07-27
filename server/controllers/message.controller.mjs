import { createMessage, getMessages } from "../models/message.model.mjs";

export const sendMessage = async (req, res) => {
  const { matchId } = req.params;
  try {
    let media;
    if (req.files) {
      const Uri = await cloudinaryUpload(req.files);
      const { media_id } = await createMedia(Uri);
      media = media_id;
    }
    const result = await createMessage({ ...req.body, media });
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
