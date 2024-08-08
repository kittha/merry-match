import {
  getAllPackages as getAllPackagesFromModel,
  getPackageById as getPackageByIdFromModel,
  getPackagesByParam as getPackagesByParamFromModel,
} from "../models/package.model.mjs";

/**
 * Get all packages data from the Merry Match application.
 *
 * @param {object} req - The request object, contain nothing.
 * @param {object} res - The response object, used to send response with data back to the client.
 * @returns
 */
export const getAllPackages = async (req, res) => {
  try {
    const packagesList = await getAllPackagesFromModel(req);
    return res.status(200).json({
      message: "Fetch list of packages successfully.",
      data: packagesList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Get all packages data from the Merry Match application.
 *
 * @param {object} req - The request object, contain nothing.
 * @param {object} res - The response object, used to send response with data back to the client.
 * @returns
 */
export const getPackagesByParam = async (req, res) => {
  try {
    const name = req.query.name;
    const packagesParam = await getPackagesByParamFromModel(name);
    return res.status(200).json({
      data: packagesParam,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Get packages data by id from the Merry Match application.
 *
 * @param {object} req - The request object, contain params id.
 * @param {object} res - The response object, used to send response with data back to the client.
 * @returns
 */
export const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const packageDetailsObj = await getPackageByIdFromModel(packageId);
    return res.status(200).json(packageDetailsObj);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
