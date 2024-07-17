import {
  getAllComplaints as getAllComplaintsFromModel,
  getComplaintById as getComplaintByIdFromModel,
  updateComplaintStatus as updateComplaintStatusFromModel,
} from "../models/complaint.model.mjs";

import {
  createPackage as createPackageFromModel,
  updatePackageById as updatePackageByIdFromModel,
  deletePackageById as deletePackageByIdFromModel,
} from "../models/package.model.mjs";

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await getAllComplaintsFromModel();
    return res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaints." });
  }
};

export const getComplaintById = async (req, res) => {
  const complaintId = req.params.complaintId;
  try {
    const complaint = await getComplaintByIdFromModel(complaintId);
    return res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaint." });
  }
};

export const updateComplaintStatus = async (req, res) => {
  const complaintId = req.params.complaintId;
  const status = req.body.status;
  try {
    await updateComplaintStatusFromModel(complaintId, status);
    return res
      .status(200)
      .json({ message: "Update Complaint Status Success." });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaint." });
  }
};

/**
 * Creates a new package for the Merry Match application.
 *
 * @param {object} req - The request object, containing the data to create package in the body.
 * @param {object} res - The response object, used to send the response back to the client.
 * @returns {object} - The response object, containing the information message with data that just created in json format
 */
export const createPackage = async (req, res) => {
  try {
    const { name, price, merry_limit, details } = req.body;

    const result = await createPackageFromModel(
      name,
      Number(price),
      Number(merry_limit),
      details
    );

    return res.status(200).json({
      message: `Create ${result.name} package successfully.`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Update a previous package for the Merry Match application.
 *
 * @param {object} req - The request object, contain params id & data of package detail.
 * @param {object} res - The response object, used to send response with data back to the client.
 * @returns
 */
export const updatePackageById = async (req, res) => {
  try {
    const packageId = req.params.packageId;

    const packageDetails = req.body;

    const updatedPackage = await updatePackageByIdFromModel(
      packageId,
      packageDetails
    );

    return res.status(200).json({
      message: `Package ${updatedPackage.package_id} has been updated.`,
      data: updatedPackage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Delete packages by id from the Merry Match application.
 *
 * @param {object} req - The request object, contain params id.
 * @param {object} res - The response object, contain message and detail of deleted package.
 */
export const deletePackageById = async (req, res) => {
  try {
    const packageId = req.params.packageId;

    const deleteResult = await deletePackageByIdFromModel(packageId);

    if (deleteResult.rowCount === 0) {
      console.error(
        `Package with id ${packageId} does not exist or was not deleted.`
      );
      return res.status(404).json({
        message: `Package with id ${packageId} does not exist or was not deleted.`,
      });
    }

    return res.status(200).json({
      message: `Package with id ${packageId} deleted successfully. This json file attached the detail of the deleted package.`,
      data: deleteResult.rows[0],
    });
  } catch (error) {
    console.error("Error deleting package:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
