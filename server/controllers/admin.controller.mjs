import {
  getAllComplaints as getAllComplaintsFromModel,
  getComplaintById as getComplaintByIdFromModel,
  updateComplaintStatus as updateComplaintStatusFromModel,
} from "../models/complaint.model.mjs";

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await getAllComplaintsFromModel();
    return res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaints." });
  }
};

export const getComplaintById = async (req, res) => {
  const { complaintId } = req.params.complaintId;
  try {
    const complaint = await getComplaintByIdFromModel(complaintId);
    return res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaint." });
  }
};

export const updateComplaintStatus = async (req, res) => {
  const { complaintsId } = req.params.complaintsId;
  const { status } = req.body.status;
  try {
    await updateComplaintStatusFromModel(complaintsId, status);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaint." });
  }
};
