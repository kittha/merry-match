import connectionPool from "../configs/db.mjs";

/**
 * Get all packages data from the Merry Match application.
 *
 * @param {*} req - The request object, contain nothing.
 * @returns - A Array of Objects(packages)
 */
export const getAllPackages = async (req) => {
  try {
    const result = await connectionPool.query(
      `
        SELECT *
        FROM packages
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
export const createPackage = async (name, price, merry_limit, details) => {
  try {
    await connectionPool.query("BEGIN");
    console.log("Init insert to db");

    const result = await connectionPool.query(
      `
      INSERT INTO packages (name, price, merry_limit, details)
      VALUES ($1, $2, $3, $4)
      RETURNING name, price, merry_limit, details
        `,
      [name, price, merry_limit, details]
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
export const updatePackageById = async (packageId, packageDetails) => {
  try {
    const { name, price, merry_limit, details } = packageDetails;

    const result = await connectionPool.query(
      `
        UPDATE packages
        SET name = $1, price = $2, merry_limit = $3, details = $4
        WHERE package_id = $5
        RETURNING *
        `,
      [name, price, merry_limit, details, packageId]
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
