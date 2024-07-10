import {
  getAllPackages as getAllPackagesFromModel,
  getPackageByParams as getPackageByParamsFromModel,
  createPackage as createPackageFromModel,
  updatePackageById as updatePackageByIdFromModel,
} from "../models/package.model.mjs";

export const getAllPackages = async (req, res) => {
  try {
    const packagesList = await getAllPackagesFromModel(req);
    return res.status(200).json(packagesList);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getPackageByParams = async (req, res) => {
  try {
    const packageDetails = await getPackageByParamsFromModel(req);
    return res.status(200).json(packageDetails);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createPackage = async (req, res) => {
  try {
    const { name, price, merry_limit, details } = req.body;
    if (!name || !price || !merry_limit || !details) {
      console.error(
        "Name, price, merry_limit, details must be provided to create package."
      );
      return res.status(401).json({
        message:
          "Name, price, merry_limit, details must be provided to create package.",
      });
    }
    const result = await createPackageFromModel(
      name,
      price,
      merry_limit,
      details
    );

    return res.status(200).json({
      message: "Create package successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updatePackageById = async (req, res) => {
  try {
    const updatedPackage = await updatePackageByIdFromModel(req);

    return res.status(200).json({
      message: `Package ${updatedPackage.package_id} has been updated.`,
      package: updatedPackage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
