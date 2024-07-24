import { createMessage, getMessages } from "../models/message.model.mjs";

export const sendMessage = async (req, res) => {
  const { matchId } = req.params;
  try {
    // const result = await createMessage(data);
    return res.status(200).json({});
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
    const result = await getMessages(matchId);
    console.log(result);
    return res.status(200).json({});
  } catch (error) {
    console.error("Error in message controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
