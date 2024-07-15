import connectionPool from "../configs/db.mjs";

export const createComplaint = async (userId, issue, description) => {
  await connectionPool.query(
    `
        INSERT INTO complaints (userId, issue, description, status)
        VALUES ($1, $2, $3, $4)
        `,
    [userId, issue, description, "pending"]
  );
};

export const getAllComplaints = async () => {
  const result = await connectionPool.query(
    `
        SELECT *
        FROM complaints
        `
  );
  const complaints = result.rows;
  return complaints;
};

export const getComplaintById = async (complaintId) => {
  const result = await connectionPool.query(
    `
        SELECt *
        FROM complaints
        WHERE complaint_id = $1
        `,
    [complaintId]
  );
  const complaint = result.rows[0];
  return complaint;
};

export const updateComplaintStatus = async (complaintId, status) => {
  await connectionPool.query(
    `
        UPDATE complaints
        SET status = $1
        WHERE id = $2
        `,
    [status, complaintId]
  );
};
