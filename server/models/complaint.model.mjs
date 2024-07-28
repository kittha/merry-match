import connectionPool from "../configs/db.mjs";

export const createComplaint = async (userId, issue, description) => {
  try {
    await connectionPool.query(
      `
        INSERT INTO complaints (created_by, issue, description, status)
        VALUES ($1, $2, $3, $4)
      `,
      [userId, issue, description, "new"]
    );
    return { message: "Complaint created successfully." };
  } catch (error) {
    console.error("Error creating complaint:", error);
    return {
      message: "An error occurred while creating the complaint.",
      error: error.message,
    };
  }
};

export const getAllComplaints = async () => {
  try {
    const result = await connectionPool.query(
      `
          SELECT *
          FROM complaints
          `
    );
    const complaints = result.rows;
    return complaints;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return { message: "An error occurred while fetching complaints." };
  }
};

export const getComplaintById = async (complaintId) => {
  const result = await connectionPool.query(
    `
        SELECT *
        FROM complaints
        WHERE complaint_id = $1
        `,
    [complaintId]
  );

  const complaint = result.rows[0];
  return complaint;
};

export const updateComplaintStatus = async (complaintId, status) => {
  const result = await connectionPool.query(
    `
        UPDATE complaints
        SET status = $1
        WHERE complaint_id = $2
        `,
    [status, complaintId]
  );
  return;
};
