import { createMessage, getMessages } from "../models/message.model.mjs";
import { Server } from "socket.io";

export const sendMessage = async (req, res) => {
  const { matchId } = req.params;
  try {
    const { sender, message } = req.body;
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
