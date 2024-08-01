import { getMatchByMatchId } from "../models/matching.model.mjs";

export const getMatchInformation = async (req, res) => {
  const { matchId } = req.params;
  try {
    console.log("matchID", matchId);
    const result = await getMatchByMatchId(Number(matchId));
    console.log("result", result);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in message controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
