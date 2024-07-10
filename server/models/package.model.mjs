import connectionPool from "../configs/db.mjs";

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
  } finally {
    connectionPool.release();
  }
};

export const getPackageByParams = async (req) => {
  try {
    const packageName = req.params.packageName;
    const result = await connectionPool.query(
      `
        SELECT *
        FROM packages
        WHERE name = $1
        `,
      [packageName]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  } finally {
    connectionPool.release();
  }
};

export const createPackage = async (name, price, merry_limit, details) => {
  try {
    await connectionPool.query("BEGIN");

    const result = await connectionPool.query(
      `
      INSERT INTO packages (name, price, merry_limit, details)
      VALUES ($1, $2, $3, $4)
      RETURNING name, price, merry_limit, details
        `,
      [name, price, merry_limit, details]
    );

    await connectionPool.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    console.error("Error creating package:", error);
    throw error;
  } finally {
    connectionPool.release();
  }
};

export const updatePackageById = async (req) => {
  try {
    const packageId = req.params.packageId;
    const { name, price, merry_limit, details } = req.body;

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
  } finally {
    connectionPool.release();
  }
};
