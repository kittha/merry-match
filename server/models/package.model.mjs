import connectionPool from "../configs/db.mjs";

/**
 * Get all packages data from the Merry Match application.
 *
 * @param {*} req - The request object, contain non important things.
 * @returns - A Array of Objects(packages)
 */
export const getAllPackages = async (req) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT *
        FROM packages WHERE is_deleted = FALSE
        `
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

/**
 * Get packages data by id from the Merry Match application.
 *
 * @param {number} packageId - The Number of package id.
 * @returns {object} - The Object that contain many key:value pairs of package details
 */
export const getPackageById = async (packageId) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT *
        FROM packages
        WHERE package_id = $1
        `,
      [packageId]
    );

    const packageDetails = result.rows[0];

    return packageDetails;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

/**
 * Creates a new package for the Merry Match application.
 *
 * @param {string} name - The name of the package
 * @param {number} price - The price of the package
 * @param {number} merry_limit - The merry limit of the package
 * @param {array} details - Additional details of the package
 * @returns {object} - The newly create package object contain many key:value pairs
 */
export const createPackage = async (
  name,
  price,
  merry_limit,
  details,
  avatarUri
) => {
  try {
    await connectionPool.query("BEGIN");
    console.log("Init insert to db");

    const result = await connectionPool.query(
      `
      INSERT INTO packages (name, price, merry_limit, details, cloudinary_id, url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING name, price, merry_limit, details, cloudinary_id, url
        `,
      [
        name,
        price,
        merry_limit,
        details,
        avatarUri[0].publicId,
        avatarUri[0].url,
      ]
    );
    console.log("finished insert to db");
    await connectionPool.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error creating package:", error);
    throw error;
  }
};

/**
 *  Update a previous package for the Merry Match application.
 *
 * @param {number} packageId - The Number of package id.
 * @param {object} packageDetails - The Object that contain many key:value pairs of package details
 * @returns - The Object that contain many of updated key:value pairs of package details
 */
export const updatePackageById = async (
  packageId,
  packageDetails,
  avatarUri
) => {
  const currentDateTime = new Date();
  try {
    const { name, price, merry_limit, details } = packageDetails;

    const result = await connectionPool.query(
      `
        UPDATE packages
        SET name = $1, price = $2, merry_limit = $3, details = $4, cloudinary_id = $6, url = $7, updated_at = $8
        WHERE package_id = $5
        RETURNING *
        `,
      [
        name,
        price,
        merry_limit,
        details,
        packageId,
        avatarUri[0].publicId,
        avatarUri[0].url,
        currentDateTime,
      ]
    );

    if (result.rows.length === 0) {
      return { message: `Package with id ${packageId} not found.` };
    }

    const updatedPackage = result.rows[0];

    return updatedPackage;
  } catch (error) {
    console.error("Error updating package:", error);
    throw error;
  }
};

/**
 *
 * @param {number} packageId - The Number of package id.
 * @returns - The response object, the important "key" is rowCount and rows[] ,used to send response back to the client.
 */
export const deletePackageById = async (packageId) => {
  const currentDateTime = new Date();
  try {
    const deleteResult = await connectionPool.query(
      `
      UPDATE packages SET is_deleted = TRUE, updated_at = $2, deleted_at = $2 
      WHERE package_id = $1
      RETURNING *
      `,
      [packageId, currentDateTime]
    );
    // console.log(deleteResult);

    return deleteResult;
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
};
