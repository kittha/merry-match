import {
  getMerryLists as getMerryListsFromModel,
  getMerryAndMatchCounts as getMerryAndMatchCountsFromModel,
  updateStatus as updateStatusFromModel,
} from "../models/merrylist.model.mjs";

/**
 * get all merry list data from Merry Match Web Application
 * @param {object} req - The request object, contain nothing.
 * @param {object} res - The response object, used to send response with data back to the client.
 * @returns
 */
export const getMerryLists = async (req, res) => {
  try {
    const userId = req.params.userId;

    // ตรวจสอบว่ามี userId หรือไม่
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required.",
      });
    }

    // เรียกใช้งานฟังก์ชันจากโมเดล
    const merryList = await getMerryListsFromModel(userId);
    const counts = await getMerryAndMatchCountsFromModel(userId);

    // ตรวจสอบผลลัพธ์
    if (!merryList || !counts) {
      return res.status(404).json({
        message: "Data not found.",
      });
    }

    console.log("Merry List:", merryList);
    console.log("Counts:", counts);

    return res.status(200).json({
      message: "Fetch merry list successfully.",
      data: { merryList: merryList, merryCounts: counts },
    });
  } catch (error) {
    console.error("Error fetching merry list:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * get all merry list data from Merry Match Web Application
 * @param {object} req - The request object, contain nothing.
 * @param {object} res - The response object, used to send response with data back to the client.
 * @returns
 */
export const updateStatus = async (req, res) => {
  try {
    const { userId } = req.params; // รับค่าจาก params หรือ body

    // ตรวจสอบว่ามี userId หรือไม่
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required.",
      });
    }

    // เรียกใช้งานฟังก์ชันจากโมเดล
    const merryListStatus = await updateStatusFromModel(userId);

    console.log("Merry List Status:", merryListStatus); // แสดงข้อมูลที่ถูกดึงมา

    return res.status(200).json({
      message: "Fetch merry list successfully.",
      data: { merryListStatus },
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
