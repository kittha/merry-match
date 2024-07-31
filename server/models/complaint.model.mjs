import connectionPool from "../configs/db.mjs";

export const createComplaint = async (userId, issue, description) => {
  try {
    await connectionPool.query(
      `
        INSERT INTO complaints (created_by, issue, description, status)
        VALUES ($1, $2, $3, $4)
      `,
      [userId, issue, description, "New"]
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
          select users.username , complaints.* 
          from complaints 
          inner join users 
          on complaints.created_by = users.user_id
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
  try {
    const result = await connectionPool.query(
      `
          SELECT users.username , complaints.* 
          from complaints 
          inner join users 
          on complaints.created_by = users.user_id
          WHERE complaint_id = $1
          `,
      [complaintId]
    );
    const complaint = result.rows[0];
    return complaint;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return { message: "An error occurred while fetching complaints." };
  }
};

export const updateComplaintStatus = async (complaintId, status) => {
  const currentDateTime = new Date();
  try {
    await connectionPool.query(
      `
          UPDATE complaints
          SET status = $1, updated_at = $3
          WHERE complaint_id = $2
          `,
      [status, complaintId, currentDateTime]
    );
    return { message: "Complaint update successfully." };
  } catch (error) {
    console.error("Error updating complaint:", error);
    return {
      message: "An error occurred while updating the complaint.",
      error: error.message,
    };
  }
};
