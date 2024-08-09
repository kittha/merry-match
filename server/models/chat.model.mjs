import connectionPool from "../configs/db.mjs";

export const createMessage = async (data) => {
  const { sender, receiver, matchId, message, mediaId, dateTime } = data;
  try {
    const result = await connectionPool.query(
      `INSERT INTO messages (
        sender_id, 
        receiver_id, 
        match_id, 
        message, 
        media_id, 
        sent_at, 
        updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $6)
      RETURNING *`,
      [sender, receiver, matchId, message, mediaId, dateTime]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in message model", error);
    throw error;
  }
};

export const getMessages = async (matchId) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM messages 
      LEFT JOIN media ON messages.media_id = media.media_id
      WHERE match_id = $1::INTEGER
      ORDER BY sent_at DESC`,
      [matchId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error in message model", error);
    throw error;
  }
};

export const createMedia = async (imageUri) => {
  const { url, publicId, fileType } = imageUri;
  try {
    const result = await connectionPool.query(
      `INSERT INTO media (
        url, 
        cloudinary_id, 
        type)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [url, publicId, fileType]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in message model", error);
    throw error;
  }
};

export const getLastMessages = async (matchIds) => {
  try {
    const result = await connectionPool.query(
      `SELECT DISTINCT ON (match_id) *
      FROM messages
      WHERE match_id = ANY($1::int[])
      ORDER BY match_id, sent_at DESC`,
      [matchIds]
    );
    return result.rows;
  } catch (error) {
    console.error("Error in message model", error);
    throw error;
  }
};
