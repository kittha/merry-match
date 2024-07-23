import { getMerryLists as getMerryListsFromModel } from "../models/merrylist.model.mjs";
/**
 * get all merry list data from Merry Match Web Application
 * @param {object} req - The request object, contain nothing.
 * @param {object} res - The response object, used to send response with data back to the client.
 * @returns
 */
export const getMerryLists = async (req, res) => {
  try {
    const merryList = await getMerryListsFromModel(req);
    console.log("I'm here");
    return res.status(200).json({
      message: "Fetch merry list successfully.",
      data: merryList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
